import React from 'react';
import Navbar from '../../../components/navbar';

export default function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Navbar />
            {children}
        </section>
    );
}
