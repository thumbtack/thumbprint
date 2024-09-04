import React from 'react';

import helpSvg from './svg/help.svg';
import colorSvg from './svg/color.svg';
import aboutSvg from './svg/about.svg';
import checklistSvg from './svg/checklist.svg';
import styles from './index.module.scss';

export default function Featured(): JSX.Element {
    return (
        <div className="grid">
            <div className="m_col-6 mb3">
                <a
                    href="/overview/about/"
                    className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}
                >
                    <div className="flex pv3 ph3 m_ph4 items-center">
                        <div className="mr3">
                            <img src={aboutSvg} className="db w4 w-auto" alt="" />
                        </div>
                        <div className="">
                            <div className="tp-title-5 mb1">About</div>
                            <div className="black-300">
                                The principles and team members of Thumbprint.
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div className="m_col-6 mb3">
                <a
                    href="/guide/product/color/overview/"
                    className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}
                >
                    <div className="flex pv3 ph3 m_ph4 items-center">
                        <div className="mr3">
                            <img src={colorSvg} className="db w4 w-auto" alt="" />
                        </div>
                        <div className="">
                            <div className="tp-title-5 mb1">Color</div>
                            <div className="black-300">
                                Names and usage rules for applying it across the system.
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div className="m_col-6 mb3 m_mb0">
                <a
                    href="/components/overview"
                    className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}
                >
                    <div className="flex pv3 ph3 m_ph4 items-center">
                        <div className="mr3">
                            <img src={checklistSvg} className="db w4 w-auto" alt="" />
                        </div>
                        <div className="">
                            <div className="tp-title-5 mb1">Components</div>
                            <div className="black-300">
                                Components we’ve built and are working on.
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div className="m_col-6">
                <a
                    href="/help/"
                    className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}
                >
                    <div className="flex pv3 ph3 m_ph4 items-center">
                        <div className="mr3">
                            <img src={helpSvg} className="db w4 w-auto" alt="" />
                        </div>
                        <div className="">
                            <div className="tp-title-5 mb1">Help</div>
                            <div className="black-300">
                                Have a question or something to contribute? Let us know!
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
