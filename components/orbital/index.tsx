"use client"

import React, { useEffect, useState } from 'react';

import { MenuItem } from './menu';
export interface IMenuItem {
  route: string;
  icon?: any;
  text?: string;
  subItems?: IMenuItem[];
  link?: string;
}

interface Props {
  size: number;
  onDisconnect?: () => void;
  items: IMenuItem[];
  disabled?: boolean;
}

export const Orbital = ({ size, onDisconnect = () => { }, items, disabled = false }: Props) => {
  const [focused, setFocused] = useState(true);

  const onKeydown = (e: KeyboardEvent) => {
    if (disabled) {
      return;
    }

    if (e.code === 'KeyQ' && e.ctrlKey) {
      e.preventDefault();
      onDisconnect();
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
