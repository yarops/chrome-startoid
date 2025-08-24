import {useEffect, useMemo, useState} from 'react';
import QuickLinksWidget, { QuickLinksWidgetModel } from './QuickLinksWidget';
import styles from './index.module.scss';

// Comment: QuickLinks shows groups (widgets) of links loaded from quick-links.json

function QuickLinks() {
    // State holds widgets loaded at runtime
    const [widgets, setWidgets] = useState<QuickLinksWidgetModel[]>([]);

    // Build URL for quick-links.json packaged in the extension (or fallback for dev)
    const jsonUrl = useMemo(() => {
        try {
            // chrome.runtime.getURL works inside extension context
            // It returns a stable URL like chrome-extension://<id>/quick-links.json
            // which we can fetch without CORS issues.
            // Fallback to relative path for non-extension dev runtime.
            // Comment: safe optional chaining in case window.chrome is undefined in non-extension envs
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cr: any = (globalThis as any).chrome;
            return cr?.runtime?.getURL ? cr.runtime.getURL('quick-links.json') : '/quick-links.json';
        } catch {
            return '/quick-links.json';
        }
    }, []);

    useEffect(() => {
        let abort = new AbortController();

        const fetchWithTimeout = async (url: string, ms = 1500) => {
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), ms);
            try {
                return await fetch(url, {cache: 'no-store', signal: ctrl.signal});
            } finally {
                clearTimeout(t);
            }
        };

        const load = async () => {
            try {
                let res: Response | null = null;

                // 1) Try localhost for true live-edit only in dev
                if (import.meta.env.DEV) {
                    const localhostUrl = 'http://localhost:5173/quick-links.json';
                    try {
                        res = await fetchWithTimeout(`${localhostUrl}?t=${Date.now()}`);
                        if (!res.ok) res = null;
                    } catch {
                        res = null;
                    }
                }

                // 2) Fallback to packaged resource inside the extension (always in prod, or if dev failed)
                if (!res) {
                    res = await fetch(`${jsonUrl}?t=${Date.now()}` /* cache-bust */, {
                        cache: 'no-store',
                        signal: abort.signal
                    });
                }

                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const parsed = await res.json();

                // Accept both new shape { widgets: [...] } and legacy array of links
                let nextWidgets: QuickLinksWidgetModel[] = [];
                if (Array.isArray(parsed)) {
                    nextWidgets = [{ name: '', links: parsed }];
                } else if (parsed && Array.isArray(parsed.widgets)) {
                    nextWidgets = parsed.widgets as QuickLinksWidgetModel[];
                }

                setWidgets(nextWidgets);
            } catch (e) {
                // Comment: swallow abort errors, log others
                if ((e as Error).name !== 'AbortError') {
                    // eslint-disable-next-line no-console
                    console.warn('Failed to load quick-links.json', e);
                }
            }
        };

        // Initial load
        void load();

        // Reload on tab focus for "live" experience while editing the JSON
        const onFocus = () => void load();
        const onVisibility = () => {
            if (document.visibilityState === 'visible') void load();
        };
        window.addEventListener('focus', onFocus);
        document.addEventListener('visibilitychange', onVisibility);

        // Optional: periodic refresh every 5s (tweak if needed)
        const interval = window.setInterval(() => {
            void load();
        }, 5000);

        return () => {
            window.removeEventListener('focus', onFocus);
            document.removeEventListener('visibilitychange', onVisibility);
            window.clearInterval(interval);
            abort.abort();
        };
    }, [jsonUrl]);

    return (
        <div className={styles.QuickLinks}>
            {widgets.map((w, i) => (
                <QuickLinksWidget key={`${w.name}-${i}`} widget={w} />
            ))}
        </div>
    );
}

export default QuickLinks;