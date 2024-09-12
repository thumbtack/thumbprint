import React from 'react';
import styles from './badge.module.scss';

interface ConfigItem {
    top?: number;
    right?: number;
    size: number;
}

type SizeClassesType = {
    xsmall: {
        userOnline: ConfigItem;
        userChecked: ConfigItem;
    };
    small: {
        userOnline: ConfigItem;
        userChecked: ConfigItem;
    };
    medium: {
        userOnline: ConfigItem;
        userChecked: ConfigItem;
    };
    large: {
        userOnline: ConfigItem;
        userChecked: ConfigItem;
    };
    xlarge: {
        userOnline: ConfigItem;
        userChecked: ConfigItem;
    };
};

// TODO(giles): remove all "checked" configs once we delete the isChecked prop
const sizeClasses: SizeClassesType = {
    xsmall: {
        userOnline: {
            top: 0,
            right: -2,
            size: 12,
        },
        userChecked: {
            top: -2,
            right: -4,
            size: 17,
        },
    },
    small: {
        userOnline: {
            top: 1,
            right: -2,
            size: 12,
        },
        userChecked: {
            top: -2,
            right: -4,
            size: 17,
        },
    },
    medium: {
        userOnline: {
            top: 2,
            right: 2,
            size: 14,
        },
        userChecked: {
            top: -2,
            right: -2,
            size: 20,
        },
    },
    large: {
        userOnline: {
            top: 4,
            right: 5,
            size: 18,
        },
        userChecked: {
            top: 0,
            right: 0,
            size: 24,
        },
    },
    xlarge: {
        userOnline: {
            top: 0,
            right: 14,
            size: 24,
        },
        userChecked: {
            top: 0,
            right: 6,
            size: 30,
        },
    },
};

type BadgeType = 'userOnline' | 'userChecked';

interface PropTypes {
    size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    type: 'user' | 'entity';
    children?: React.ReactNode;
}

/**
 * `Badge` appears on the top-right corner of an `Avatar`. It is used to either
 * show a checkmark or an indicator that there are unread notifications. This is deprecated.
 */
export default function Badge({ size, type, children }: PropTypes): JSX.Element {
    let badgeType: BadgeType = 'userOnline';

    if (type === 'user' && children) {
        badgeType = 'userChecked';
    }

    const styleConfig: ConfigItem = sizeClasses[size][badgeType];

    return (
        <div
            className={styles.badge}
            style={{
                top: styleConfig.top,
                right: styleConfig.right,
                width: styleConfig.size,
                height: styleConfig.size,
            }}
        >
            {children}
        </div>
    );
}
