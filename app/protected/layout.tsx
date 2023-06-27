import TopBar from '@/components/menus/topbar';
import React from 'react';
import Navbar from '../../components/menus/navbar';

export default function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <TopBar />
            <Navbar />
            {children}
        </section>
    );
}
