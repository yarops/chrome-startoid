import React from 'react';
import Icon from '@/components/Icon';
import styles from './QuickLink.module.scss';

// Comment: Presentational component for a single quick link
// Comments are in English per your rule.

export type QuickLinkItem = {
    name: string;
    url: string;
};

export type QuickLinkProps = {
    link: QuickLinkItem;
    size?: number; // icon size in px
    onClick?: (url: string) => void;
    className?: string;
};

const QuickLink: React.FC<QuickLinkProps> = ({link, size = 32, onClick}) => {
    const handleClick = () => {
        if (onClick) onClick(link.url);
        else window.open(link.url, '_blank');
    };

    return (
        <div
            className={styles.QuickLink}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClick();
            }}
        >
            <div className={styles.QuickLinkIcon}>
                <Icon url={link.url} size={size} alt={link.name}/>
            </div>
            <div className={styles.QuickLinkName}>{link.name}</div>
        </div>
    );
};

export default QuickLink;