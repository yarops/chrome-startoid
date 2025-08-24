import React, {useCallback, useMemo, useState} from 'react';
import styles from './index.module.scss';

// Comments are in English per your rule.
// Icon component tries multiple favicon sources for a given URL with graceful fallback.

export type IconProps = {
    url: string;
    size?: number; // px
    className?: string;
    style?: React.CSSProperties;
    alt?: string;
};

function getHostname(input: string): string | null {
    try {
        const u = new URL(input);
        return u.hostname;
    } catch (_) {
        return null;
    }
}

const Icon: React.FC<IconProps> = ({url, size = 32, className, style, alt}) => {
    const hostname = useMemo(() => getHostname(url), [url]);

    const sources = useMemo(() => {
        if (!hostname) return [] as string[];
        return [
            // 1) DuckDuckGo icon proxy (ico)
            `https://icons.duckduckgo.com/ip3/${hostname}.ico`,
            // 2) Google S2 favicon service (png)
            `https://www.google.com/s2/favicons?domain=${hostname}&sz=${Math.min(Math.max(size, 16), 128)}`,
            // 3) Direct site favicon
            `https://${hostname}/favicon.ico`
        ];
    }, [hostname, size]);

    const [idx, setIdx] = useState(0);

    const handleError = useCallback(() => {
        setIdx((prev) => (prev + 1 < sources.length ? prev + 1 : prev));
    }, [sources.length]);

    if (!hostname || sources.length === 0) {
        // Minimal textual fallback to avoid layout shift
        return (
            <div
                className={className}
                style={{
                    width: size,
                    height: size,
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.2)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: Math.round(size * 0.5),
                    userSelect: 'none',
                    ...style
                }}
                aria-label={alt || 'icon'}
            >
                ⬚
            </div>
        );
    }

    const src = sources[idx];

    return (
        <div>

            <img
                src={src}
                alt={alt || hostname}
                width={size}
                height={size}
                className={styles.Icon}
                style={{
                    width: size,
                    height: size,
                    borderRadius: 6,
                    objectFit: 'cover',
                    ...style
                }}
                onError={handleError}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
            />
        </div>
    );
};

export default Icon;
