import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

export default function TabNav({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="mb5">
            <nav className="flex">{children}</nav>
            <div className="bb bw-3 b-gray-300" />
        </div>
    );
}

export function TabNavItem({
    href,
    children,
    isActive,
}: {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
}): JSX.Element {
    return (
        <Link
            className={classNames('b pv2 ph3 black relative top-3', isActive && 'bb bw-3 b-blue')}
            href={href}
        >
            {children}
        </Link>
    );
}
