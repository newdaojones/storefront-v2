import React from 'react';

export default function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {children}
        </section>
    );
}
