"use client"

import * as encoding from '@walletconnect/encoding';
import Client from '@walletconnect/sign-client';
import { PairingTypes, SessionTypes } from "@walletconnect/types";
import { getSdkError } from "@walletconnect/utils";
import { signIn, signOut } from "next-auth/react";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { SiweMessage, generateNonce } from "siwe";
import { DEFAULT_EIP155_METHODS, DEFAULT_MERCHANT_APP_METADATA, DEFAULT_PROJECT_ID, DEFAULT_RELAY_URL } from "./config";
import { getRequiredNamespaces } from "./helper";
import { config } from 'config';
import { sendLog } from '@/lib/log';

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
  isLoginInning: boolean;
}

export const ClientContext = createContext<IContext>({} as IContext);

export function WalletConnectProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginInning, setIsLoginInning] = useState(true)
  const [session, setSession] = useState<SessionTypes.Struct>();
  const [pairings, setPairings] = useState<PairingTypes.Struct[]>([]);
  const [client, setClient] = useState<Client>();
  const [isInitializing, setIsInitializing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [qrCodeUri, setQRCodeUri] = useState<string>();
  const [account, setAccount] = useState<string>();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [chains] = useState([`eip155:${config.CHAIN_ID}`]) // Polygon Testnet

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
    localStorage.clear()
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
        topic: session?.topic,
        reason: getSdkError("USER_DISCONNECTED"),
      });

      reset();
      signOut()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      reset();
      setIsLoading(false);
    }
  }, [client, session]);

  const onSessionConnected = useCallback((_session: SessionTypes.Struct) => {
    const allNamespaceAccounts = Object.values(_session.namespaces)
      .map(namespace => namespace.accounts)
      .flat();
    setSession(_session);
    setAccounts(allNamespaceAccounts);
    setAccount(allNamespaceAccounts[0])
  }, []);

  const connect = useCallback(
    async (pairing?: any) => {
      try {
        console.log('connect request', session)
        if (session) {
          return
        }

        if (typeof client === 'undefined') {
          throw new Error('WalletConnect is not initialized');
        }

        const requiredNamespaces = getRequiredNamespaces(chains);
        let connectParams = {
          pairingTopic: pairing?.topic,
          requiredNamespaces,
        };
        console.log('sent connect request', connectParams)
        const { uri, approval } = await client.connect(connectParams);

        if (uri) {
          setQRCodeUri(uri);
        }

        const _session = await approval();
        onSessionConnected(_session);
        setPairings(client.pairing.getAll({ active: true }));
      } catch (e: any) {
        sendLog({
          message: 'failed connect wallet',
          errorMessage: e.message
        })
        disconnect();
      }
    },
    [client, chains, session, onSessionConnected, disconnect]
  );

  const login = useCallback(async () => {
    if (!account || !session || !client || isLoggedIn) {
      return
    }

    try {
      setIsLoading(true)
      const [namespace, chainId, address] = account.split(':');
      // send message
      const data = localStorage.getItem(`${SIGNATURE_PREFIX}_${account}`)
      let signature: string | undefined = undefined
      let issuedAt: string | undefined = undefined
      let nonce: string | undefined = undefined

      if (data) {
        const jsonData = JSON.parse(data)
        signature = jsonData?.signature
        issuedAt = jsonData?.issuedAt
        nonce = jsonData?.nonce
      }

      if (!nonce) {
        nonce = generateNonce()
      }

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
          issuedAt: siweMessage.issuedAt,
          nonce
        }));
      }

      const res = await signIn("credentials", {
        message: JSON.stringify(siweMessage),
        signature,
        nonce,
        redirect: false,
      });

      if (res?.status !== 200 || res?.error) {
        sendLog({
          message: 'failed verify signature',
          status: res?.status,
          error: res?.error
        })

        disconnect()
      }

      setIsLoggedIn(true)
    } catch (err) {
    } finally {
      setIsLoading(false)
      setIsLoginInning(false)
    }
  }, [client, session, account, isLoggedIn, disconnect])

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
      console.log("EVENT", "session_ping", args);
    });

    client.on("session_ping", args => {
      console.log(`**** session_ping event. args: ${args}`);
    });

    client.on("session_event", args => {
      console.log("EVENT", "session_event", args);
    });

    client.on("session_update", ({ topic, params }) => {
      console.log("EVENT", "session_update", { topic, params });
      const { namespaces } = params;
      const _session = client.session.get(topic);
      const updatedSession = { ..._session, namespaces };
      onSessionConnected(updatedSession);
    });

    client.on("session_proposal", () => {
      console.log("EVENT", "session_proposal");
    })

    client.on("session_delete", () => {
      console.log("EVENT", "session_delete");
      sendLog({
        message: 'session deleted'
      })
      reset();
      signOut()
    });
  }, [client, onSessionConnected])

  const _checkPersistedState = useCallback(
    async () => {
      if (!client) {
        return;
      }
      // populates existing pairings to state
      setPairings(client.pairing.values);

      if (client.session.length) {
        const lastKeyIndex = client.session.keys.length - 1;
        const _session = client.session.get(client.session.keys[lastKeyIndex]);
        console.log('session==============', client.session.keys)
        console.log(_session)
        await onSessionConnected(_session);
        return _session;
      } else {
        setIsLoginInning(false)
      }
    },
    [client, onSessionConnected, setPairings]
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
      isLoginInning
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
      isLoginInning,
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
