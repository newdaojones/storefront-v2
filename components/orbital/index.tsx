"use client"

import { useGlobal } from '@/app/providers/global-context';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { MenuItem } from './menu';

export interface IMenuItem {
  id: number;
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
  //const [focused, setFocused] = useState(true);
  const { activeComponent, setActiveComponent, focused, setFocused } = useGlobal();

  const onKeydown = useCallback((e: KeyboardEvent) => {
    if (disabled || activeComponent !== 'Orbital') {
      return; // Skip this handler if Orbital is not active or disabled
    }

    if (e.code === 'Enter') {
      setActiveComponent('PaymentList');
    }

    if (e.code === 'Enter' && e.shiftKey) {
      return setActiveComponent('Orbital');
    }

    if (e.code === 'KeyQ' && e.ctrlKey) {
      e.preventDefault();
    }
  }, [activeComponent, disabled, setActiveComponent]);

  useEffect(() => {
    if (activeComponent === 'Orbital') {
      window.addEventListener('keydown', onKeydown);
    }
    return () => window.removeEventListener('keydown', onKeydown);
  }, [activeComponent, onKeydown]);

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

        <MenuItem
          onFocused={() => setActiveComponent('Orbital')}
          zIndex={0} items={items}
          size={size + 50}
          disabled={disabled}
          focused={activeComponent === 'Orbital'} />
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
        { id: 1, route: '/protected/orders', text: 'Orders' },
        { id: 2, route: '/protected/payments', text: 'Payments' },
        { id: 3, route: '/protected/gateway', text: 'Gateway' },
        { id: 4, route: '/protected/settings', text: 'Settings' },
      ]}
      size={450}
    />
  )
}