import React from 'react';
import { Link } from 'gatsby';

const isActive = ({ isCurrent }: { isCurrent: boolean }): { className: string } => {
    const commonClasses = 'b pv2 ph3 black relative top-3 ';
    return isCurrent
        ? { className: `bb bw-3 b-blue ${commonClasses}` }
        : { className: commonClasses };
};

export default function TabNav({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="mb5">
            <nav className="flex">{children}</nav>
            <div className="bb bw-3 b-gray-300" />
        </div>
    );
}

export function TabNavItem({
    to,
    children,
}: {
    to: string;
    children: React.ReactNode;
}): JSX.Element {
    return (
        <Link getProps={isActive} to={to}>
            {children}
        </Link>
    );
}
