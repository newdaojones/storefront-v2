import TopBar from '@/components/menus/topbar';
import Orbital from '@/components/orbital/orbital';
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
