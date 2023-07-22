
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
          width: 270,
          height: 270,
          type: 'svg',
          data: qrCodeUri,
          dotsOptions: {
            type: 'dots',
            gradient: {
              type: 'linear',
              rotation: 90,
              colorStops: [
                { offset: 0.4, color: '#d2cdff' },
                { offset: 0.9, color: '#c1f8ff' },
              ],
            },
          },
          cornersDotOptions: {
            color: '#d2cdff',
          },
          cornersSquareOptions: {
            color: '#00ff83',
            type: 'extra-rounded',
          },
          backgroundOptions: {
            color: '#13053d',
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

  return (
    <div className="flex items-center justify-center flex-col text-charcoal">
      <a href={backpackDeeplink} target={"_blank"} className="" rel={"noreferrer"}>
        <div className="flex items-center justify-center pt-2 relative">
          <div id="qrcode" className="flex items-center justify-center rounded-10xl overflow-hidden qrcode">
          </div>
          <Image className="w-20 h-20 absolute z-10" src={logoIcon} alt="" />
        </div>
      </a>
    </div>
  );
};

