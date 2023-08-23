"use client"

import React, { useEffect, useState } from 'react';

import { MenuItem } from './menu';
import { useSession } from 'next-auth/react';
export interface IMenuItem {
  route: string;
  icon?: any;
  text?: string;
  subItems?: IMenuItem[];
  link?: string;
}

interface Props {
  size: number;
  items: IMenuItem[];
  disabled?: boolean;
}

const Orbital = ({ size, items, disabled = false }: Props) => {
  const [focused, setFocused] = useState(true);

  const onKeydown = (e: KeyboardEvent) => {
    if (disabled) {
      return;
    }

    if (e.code === 'KeyQ' && e.ctrlKey) {
      e.preventDefault();
    }

    if (e.code === 'Enter' && e.shiftKey) {
      return setFocused(true);
    }

    if (e.code === 'Enter') {
      return setFocused(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, disabled]);

  return (
    <div className='absolute top-0'>
      <div
        className="flex items-center justify-center mr-8"
        style={{
          marginLeft: -size / 3,
          marginTop: -size / 3 - 40,
          width: size,
          minWidth: size,
          height: size,
          minHeight: size,
          position: 'relative',
        }}
      >

        <div className="bg-gradient-radial rounded-full"
          style={{
            width: size * 0.8,
            height: size * 0.8
          }}
        />

        <MenuItem onFocused={() => setFocused(true)} zIndex={0} items={items} size={size + 50} disabled={disabled} focused={focused} />
      </div>
    </div>
  );
};

export const OrbitalMenu = () => {
  const { data: session } = useSession()

  const disabled = !session || !!session?.isNewUser || session?.user.status !== 'VERIFIED' || session?.user.role === "GUEST"
  return (
    <Orbital
      disabled={disabled}
      items={[
        { route: '/protected/orders', text: 'Orders' },
        { route: '/protected/payments', text: 'Payments' },
        { route: '/protected/gateway', text: 'Gateway' },
        { route: '/protected/settings', text: 'Settings' },
      ]}
      size={450}
    />
  )
}