import Image from 'next/image';
import QRCode from 'qrcode';
import React, { PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type QrCodeModalProps = PropsWithChildren & {
  buildId: string;
};

const getData = async (url: string) => {
  return QRCode.toDataURL(url);
};

const QrCodeModal = async (props: QrCodeModalProps) => {
  const qrCode = await getData(`http://localhost:3000/b/${props.buildId}`);

  return (
    <Dialog>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent>
        <Image width={300} height={300} src={qrCode} alt="QR Code" />
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeModal;
