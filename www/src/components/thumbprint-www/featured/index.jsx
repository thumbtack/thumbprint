import React from 'react';
import { Link } from 'gatsby';

import HelpSvg from './svg/help.svg';
import ColorSvg from './svg/color.svg';
import AboutSvg from './svg/about.svg';
import ChecklistSvg from './svg/checklist.svg';
import styles from './index.module.scss';

const Featured = () => (
    <div className="grid">
        <div className="m_col-6 mb3">
            <Link
                to="/overview/about/"
                className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}
            >
                <div className="flex pv3 ph3 m_ph4 items-center">
                    <div className="mr3">
                        <AboutSvg className="db w4 w-auto" />
                    </div>
                    <div className="">
                        <div className="tp-title-5 mb1">About</div>
                        <div className="black-300">
                            The principles and team members of Thumbprint.
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        <div className="m_col-6 mb3">
            <Link
                to="/guide/product/color/"
                className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}
            >
                <div className="flex pv3 ph3 m_ph4 items-center">
                    <div className="mr3">
                        <ColorSvg className="db w4 w-auto" />
                    </div>
                    <div className="">
                        <div className="tp-title-5 mb1">Color</div>
                        <div className="black-300">
                            Names and usage rules for applying it across the system.
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        <div className="m_col-6 mb3 m_mb0">
            <Link
                to="/updates/roadmap/"
                className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}
            >
                <div className="flex pv3 ph3 m_ph4 items-center">
                    <div className="mr3">
                        <ChecklistSvg className="db w4 w-auto" />
                    </div>
                    <div className="">
                        <div className="tp-title-5 mb1">Roadmap</div>
                        <div className="black-300">
                            Work we’re planning and work we’ve completed.
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        <div className="m_col-6">
            <Link
                to="/help/"
                className={`bg-white br2 black db h-100 color-inherit ${styles.shadow}`}
            >
                <div className="flex pv3 ph3 m_ph4 items-center">
                    <div className="mr3">
                        <HelpSvg className="db w4 w-auto" />
                    </div>
                    <div className="">
                        <div className="tp-title-5 mb1">Help</div>
                        <div className="black-300">
                            Have a question or something to contribute? Let us know!
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </div>
);

export default Featured;
