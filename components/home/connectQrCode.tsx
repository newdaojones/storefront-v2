
import { useWalletConnectClient } from '@/app/providers/walletconnect';
import Image from 'next/image';
import { useEffect } from 'react';
import logoIcon from '../../public/logo.svg';

export const Login = () => {
  const { qrCodeUri, connect, initialized } = useWalletConnectClient();

  useEffect(() => {
    const generateQRCode = async () => {
      if (qrCodeUri) {
        const QRCodeStyling = (await import('qr-code-styling')).default;

        const qrCode = new QRCodeStyling({
          width: 280,
          height: 280,
          type: 'svg',
          data: qrCodeUri,
          dotsOptions: {
            type: 'square',
            gradient: {
              type: 'linear',
              rotation: 90,
              colorStops: [
                { offset: 0.001, color: 'var(--color-purps)' },
                { offset: 0.9, color: 'var(--color-lamegray)' },
              ],
            },
          },
          cornersDotOptions: {
            color: 'var(--color-ualert)',
            type: 'dot',
          },
          cornersSquareOptions: {
            color: 'var(--color-charyo)',
            type: 'extra-rounded',
          },
          backgroundOptions: {
            //color: 'var(--color-notpurple)',
            gradient: {
              type: 'linear',
              rotation: 51,
              colorStops: [
                { offset: .01, color: 'var(--color-notpurple)' },
                { offset: 1, color: 'var(--color-lamegray)', },
              ],
            },
          },
        });

        const qrCodeElement = document.getElementById('qrcode') as any;
        qrCodeElement.innerHTML = '';
        qrCode.append(qrCodeElement);
      }
    };

    generateQRCode();
  }, [qrCodeUri]);

  useEffect(() => {
    if (initialized) {
      connect()
    }
  }, [initialized, connect])

  // const wcV2Deeplink = qrCodeUri ? qrCodeUri : '';
  const backpackDeeplink = qrCodeUri ? `ndj-backpack://wc?uri=${qrCodeUri}` : '';
  // const backpackUniversalLink = qrCodeUri ? `https://jxndao.com/wc?uri=${qrCodeUri}` : '';
  //const androidIntentLink = "intent://wc/#Intent;scheme=wc;package=com.ndj.wallet;end";

  const classNames = {
    centerLogo: 'flex items-center justify-center pt-2 relative rounded-md',
    qrcode: 'flex items-center justify-center rounded-10xl overflow-hidden qrcode',
    logo: 'w-20 h-20 absolute z-10 ',
    logoBlur: 'w-20 h-20 absolute z-9 blur',
  };

  return (
    <div className="grid w-">
      <a href={backpackDeeplink} target={"_blank"} className="" rel={"noreferrer"}>
        <div className={classNames.centerLogo}>
          <div id="qrcode" className={classNames.qrcode}>
          </div>
          <Image className={classNames.logo} src={logoIcon} alt="" />
          <Image className={classNames.logoBlur} src={logoIcon} alt="" />
        </div>
      </a>
    </div>
  );
};

