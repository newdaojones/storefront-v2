import Orbital from '@/components/generics/orbital';
import TopBar from '@/components/menus/topbar';
import React from 'react';

export default function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <TopBar />
            <Orbital />
            {children}
        </section>
    );
}
