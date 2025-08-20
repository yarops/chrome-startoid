import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/Icon';

// Comment: QuickLinks show list of links with fetched favicons via <Icon />

type QuickLink = {
    name: string;
    url: string;
};

function QuickLinks() {
  // State holds links loaded at runtime
  const [links, setLinks] = useState<QuickLink[]>([]);

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

    const fetchWithTimeout = (url: string, ms = 1500) => {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), ms);
      return fetch(url, { cache: 'no-store', signal: ctrl.signal })
        .finally(() => clearTimeout(t));
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
        const data = (await res.json()) as QuickLink[];
        setLinks(data);
      } catch (e) {
        // Comment: swallow abort errors, log others
        if ((e as Error).name !== 'AbortError') {
          // eslint-disable-next-line no-console
          console.warn('Failed to load quick-links.json', e);
        }
      }
    };

    // Initial load
    load();

    // Reload on tab focus for "live" experience while editing the JSON
    const onFocus = () => load();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') load();
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);

    // Optional: periodic refresh every 5s (tweak if needed)
    const interval = window.setInterval(load, 5000);

    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearInterval(interval);
      abort.abort();
    };
  }, [jsonUrl]);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="quick-links">
      <div className="links-grid">
        {links.map((link, index) => (
          <div
            key={index}
            className="link-item"
            onClick={() => handleLinkClick(link.url)}
          >
            <div className="link-icon">
              <Icon url={link.url} size={32} alt={link.name} />
            </div>
            <div className="link-name">{link.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickLinks;