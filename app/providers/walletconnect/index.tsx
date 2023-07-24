"use client"

import * as encoding from '@walletconnect/encoding';
import Client from '@walletconnect/sign-client';
import { PairingTypes, SessionTypes } from "@walletconnect/types";
import { getSdkError } from "@walletconnect/utils";
import { signIn } from "next-auth/react";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { SiweMessage, generateNonce } from "siwe";
import { DEFAULT_EIP155_METHODS, DEFAULT_MERCHANT_APP_METADATA, DEFAULT_PROJECT_ID, DEFAULT_RELAY_URL } from "./config";
import { getRequiredNamespaces } from "./helper";

const SIGNATURE_PREFIX = 'NDJ_SIGNATURE_V2_';

interface IContext {
  initialized: boolean;
  qrCodeUri: string | undefined;
  client: Client | undefined;
  connect: (pairing?: { topic: string }) => Promise<void>;
  disconnect: (userRequested: boolean) => Promise<void>;
  isInitializing: boolean;
  isLoggedIn: boolean;
  account: string | undefined;
  isLoading: boolean;
  pairings: PairingTypes.Struct[];
  accounts: string[];
}

export const ClientContext = createContext<IContext>({} as IContext);

export function WalletConnectProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<SessionTypes.Struct>();
  const [pairings, setPairings] = useState<PairingTypes.Struct[]>([]);
  const [client, setClient] = useState<Client>();
  const [isInitializing, setIsInitializing] = useState(false)
  const [initialized, setInitialized] = useState(false);
  const [qrCodeUri, setQRCodeUri] = useState<string>();
  const [account, setAccount] = useState<string>();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [chains] = useState(['eip155:80001']) // Polygon Testnet

  const createClient = useCallback(async () => {
    try {
      setIsInitializing(true);

      const _client = await Client.init({
        relayUrl: DEFAULT_RELAY_URL,
        projectId: DEFAULT_PROJECT_ID,
        metadata: DEFAULT_MERCHANT_APP_METADATA,
      });
      setClient(_client);
      setInitialized(true);
    } catch (err) {
      throw err;
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const reset = () => {
    setPairings([]);
    setQRCodeUri(undefined);
    setSession(undefined);
    setAccounts([])
    setAccount(undefined)
    setIsLoggedIn(false)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes(SIGNATURE_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  };


  const disconnect = useCallback(async (userRequested: boolean = false) => {
    try {
      if (typeof client === 'undefined') {
        throw new Error('WalletConnect is not initialized');
      }
      if (typeof session === 'undefined') {
        throw new Error('Session is not connected');
      }
      setIsLoading(true);

      await client.disconnect({
        topic: session.topic,
        reason: getSdkError("USER_DISCONNECTED"),
      });

      reset();
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      reset();
      setIsLoading(false);

    }
  }, [client, session]);

  const disconnectAndReload = useCallback(() => {
    disconnect().then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }, [disconnect])

  const onSessionConnected = useCallback((_session: SessionTypes.Struct) => {
    const allNamespaceAccounts = Object.values(_session.namespaces)
      .map(namespace => namespace.accounts)
      .flat();
    const allNamespaceChains = Object.keys(_session.namespaces);
    setSession(_session);
    setAccounts(allNamespaceAccounts);
    setAccount(allNamespaceAccounts[0])
  }, []);

  const connect = useCallback(
    async (pairing?: any) => {
      try {
        if (typeof client === 'undefined') {
          throw new Error('WalletConnect is not initialized');
        }

        const requiredNamespaces = getRequiredNamespaces(chains);

        let connectParams = {
          pairingTopic: pairing?.topic,
          requiredNamespaces,
        };
        const { uri, approval } = await client.connect(connectParams);
        if (uri) {
          setQRCodeUri(uri);
        }

        const session = await approval();
        onSessionConnected(session);
        setPairings(client.pairing.getAll({ active: true }));
      } catch (e: any) {
        disconnectAndReload();
      }
    },
    [client, chains, onSessionConnected, disconnectAndReload]
  );

  const login = useCallback(async () => {
    if (!account || !session || !client) {
      return
    }

    try {
      setIsLoading(true)
      const [namespace, chainId, address] = account.split(':');
      // send message
      const data = localStorage.getItem(`${SIGNATURE_PREFIX}_${account}`)
      let signature: string | undefined = undefined
      let issuedAt: string | undefined = undefined
      if (data) {
        signature = JSON.parse(data)?.signature
        issuedAt = JSON.parse(data)?.issuedAt
      }

      const nonce = generateNonce();

      const siweMessage = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        version: "1",
        address: address,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce,
        chainId: Number(chainId),
        issuedAt
      });

      if (!signature) {
        const messageString = siweMessage.prepareMessage();
        const hexMsg = encoding.utf8ToHex(messageString, true);

        const params = [hexMsg, address];

        signature = await client?.request<string>({
          topic: session!.topic,
          chainId: `${namespace}:${chainId}`,
          request: {
            method: DEFAULT_EIP155_METHODS.PERSONAL_SIGN,
            params,
          },
        });

        localStorage.setItem(`${SIGNATURE_PREFIX}_${account}`, JSON.stringify({
          signature,
          issuedAt: siweMessage.issuedAt
        }));
      }

      const res = await signIn("credentials", {
        message: JSON.stringify(siweMessage),
        signature,
        nonce,
        redirect: false,
      });

      if (res?.status !== 200 || res?.error) {
        console.log('Failed login', res?.error)
        throw new Error('Failed login')
      }

      setIsLoggedIn(true)
    } catch (err) {
      disconnect()
    } finally {
      setIsLoading(false)
    }
  }, [client, session, account, disconnect])

  useEffect(() => {
    login()
  }, [login])

  useEffect(() => {
    createClient()
  }, [createClient])

  useEffect(() => {
    if (!client) {
      return
    }

    client.on("session_ping", args => {
      console.warn("EVENT", "session_ping", args);
    });

    client.on("session_ping", args => {
      console.warn(`**** session_ping event. args: ${args}`);
    });

    client.on("session_event", args => {
      console.warn("EVENT", "session_event", args);
    });

    client.on("session_update", ({ topic, params }) => {
      console.warn("EVENT", "session_update", { topic, params });
      const { namespaces } = params;
      const _session = client.session.get(topic);
      const updatedSession = { ..._session, namespaces };
      onSessionConnected(updatedSession);
    });

    client.on("session_proposal", () => {
      console.debug("EVENT", "session_proposal");
    })

    client.on("session_delete", () => {
      console.debug("EVENT", "session_delete");
      reset();
    });
  }, [client, onSessionConnected])

  const _checkPersistedState = useCallback(
    async () => {
      if (!client) {
        return;
      }
      // populates existing pairings to state
      setPairings(client.pairing.values);
      console.log("RESTORED PAIRINGS: ", client.pairing.values);


      if (typeof session !== 'undefined') return;

      if (client.session.length) {
        const lastKeyIndex = client.session.keys.length - 1;
        const _session = client.session.get(client.session.keys[lastKeyIndex]);
        await onSessionConnected(_session);
        return _session;
      }
    },
    [client, session, onSessionConnected, setPairings]
  );

  useEffect(() => {
    _checkPersistedState()
  }, [_checkPersistedState])

  const value = useMemo(
    () => ({
      pairings,
      qrCodeUri,
      client,
      connect,
      disconnect,
      isInitializing,
      isLoggedIn,
      initialized,
      isLoading,
      account,
      accounts,
      session,
    }),
    [
      isInitializing,
      pairings,
      isLoading,
      initialized,
      qrCodeUri,
      account,
      accounts,
      client,
      session,
      isLoggedIn,
      connect,
      disconnect,
    ]
  );

  return (
    <ClientContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useWalletConnectClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    toast.error('useWalletConnectClient must be used within a WalletConnectProvider');
  }
  return context;
}
