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
        entityOnline: ConfigItem;
    };
    small: {
        userOnline: ConfigItem;
        userChecked: ConfigItem;
        entityOnline: ConfigItem;
    };
    medium: {
        userOnline: ConfigItem;
        userChecked: ConfigItem;
        entityOnline: ConfigItem;
    };
    large: {
        userOnline: ConfigItem;
        userChecked: ConfigItem;
        entityOnline: ConfigItem;
    };
    xlarge: {
        userOnline: ConfigItem;
        userChecked: ConfigItem;
        entityOnline: ConfigItem;
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
        entityOnline: {
            size: 12,
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
        entityOnline: {
            size: 12,
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
        entityOnline: {
            size: 14,
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
        entityOnline: {
            size: 18,
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
        entityOnline: {
            size: 24,
        },
    },
};

type BadgeType = 'userOnline' | 'userChecked' | 'entityOnline';

interface PropTypes {
    size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    type: 'user' | 'entity';
    children?: React.ReactNode;
}

/**
 * `Badge` appears on the top-right corner of an `Avatar`. It is used to either
 * show a checkmark or an indicator that there are unread notifications.
 */
export default function Badge({ size, type, children }: PropTypes): JSX.Element {
    let badgeType: BadgeType = 'entityOnline';

    if (type === 'user') {
        if (children) {
            badgeType = 'userChecked';
        } else {
            badgeType = 'userOnline';
        }
    }

    const styleConfig: ConfigItem = sizeClasses[size][badgeType];

    return (
        <div
            className={styles.badge}
            style={{
                // EntityAvatar badges stick out by one third of their diameter.
                // UserAvatar badges have custom positions in the style object.
                top: badgeType === 'entityOnline' ? -(styleConfig.size / 3) : styleConfig.top,
                right: badgeType === 'entityOnline' ? -(styleConfig.size / 3) : styleConfig.right,
                width: styleConfig.size,
                height: styleConfig.size,
            }}
        >
            {children}
        </div>
    );
}
