import React from 'react';
import Link from 'next/link';
import { Text } from '@thumbtack/thumbprint-react';
import styles from './index.module.scss';

import about from './about.svg';
import checklist from './checklist.svg';
import color from './color.svg';
import help from './help.svg';

const Featured = () => (
    <div className="grid">
        <div className="m_col-6 mb3">
            <Link href="/overview/about/">
                <a className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}>
                    <div className="flex pv3 ph3 m_ph4 items-center">
                        <div className="mr3">
                            <img src={about} className="db w4 w-auto" alt="" />
                        </div>
                        <div>
                            <Text className="mb1 b">About</Text>
                            <div className="black-300">
                                The principles and team members of Thumbprint.
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
        <div className="m_col-6 mb3">
            <Link href="/guide/product/color/">
                <a className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}>
                    <div className="flex pv3 ph3 m_ph4 items-center">
                        <div className="mr3">
                            <img src={color} className="db w4 w-auto" alt="" />
                        </div>
                        <div>
                            <Text className="mb1 b">Color</Text>
                            <div className="black-300">
                                Names and usage rules for applying it across the system.
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
        <div className="m_col-6 mb3 m_mb0">
            <Link href="/components/overview">
                <a className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}>
                    <div className="flex pv3 ph3 m_ph4 items-center">
                        <div className="mr3">
                            <img src={checklist} className="db w4 w-auto" alt="" />
                        </div>
                        <div>
                            <Text className="mb1 b">Components</Text>
                            <div className="black-300">
                                Components we’ve built and are working on.
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
        <div className="m_col-6">
            <Link href="/help/">
                <a className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}>
                    <div className="flex pv3 ph3 m_ph4 items-center">
                        <div className="mr3">
                            <img src={help} className="db w4 w-auto" alt="" />
                        </div>
                        <div>
                            <Text className="mb1 b">Help</Text>
                            <div className="black-300">
                                Have a question or something to contribute? Let us know!
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    </div>
);

export default Featured;
