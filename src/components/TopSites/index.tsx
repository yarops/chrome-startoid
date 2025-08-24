import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import Icon from '@/components/Icon';

// Comment: Displays Chrome Top Sites (Most Visited) via chrome.topSites API
// Comments are in English per your rule.

export type TopSite = {
  url: string;
  title: string;
};

function isAvailable(): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cr: any = (globalThis as any).chrome;
  return !!(cr && cr.topSites && typeof cr.topSites.get === 'function');
}

// Comment: Demo data to render in DEV when topSites API is not available
const DEMO_SITES: TopSite[] = [
  { url: 'https://github.com', title: 'GitHub' },
  { url: 'https://stackoverflow.com', title: 'Stack Overflow' },
  { url: 'https://news.ycombinator.com', title: 'Hacker News' },
  { url: 'https://reddit.com', title: 'Reddit' }
];

const TopSites: React.FC = () => {
  const [sites, setSites] = useState<TopSite[]>([]);
  const available = useMemo(() => isAvailable(), []);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!available) return;
    chrome.topSites.get((data) => {
      setSites((data || []).slice(0, 12));
    });
  }, [available]);

  // Comment: In DEV show demo when API is not available
  if (!available && isDev) {
    return (
      <section className={styles.TopSites} aria-label="Top Sites">
        <h2 className={styles.Title}>Top sites</h2>
        <div className={styles.Grid}>
          {DEMO_SITES.map((s) => (
            <button key={s.url} className={styles.Item} onClick={() => window.open(s.url, '_blank')}>
              <div className={styles.IconWrap}>
                <Icon url={s.url} size={24} alt={s.title || s.url} />
              </div>
              <div className={styles.Label} title={s.title || s.url}>
                {s.title || s.url}
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  // Comment: In non-DEV, if API not available, show info message
  if (!available) {
    return (
      <section className={styles.TopSites} aria-label="Top Sites">
        <div className={styles.Info}>TopSites API is not available in this environment.</div>
      </section>
    );
  }

  // Comment: In DEV, if API returns empty, also show demo for styling
  const listToRender: TopSite[] = isDev && sites.length === 0 ? DEMO_SITES : sites;

  const open = (url: string) => window.open(url, '_blank');

  return (
    <section className={styles.TopSites} aria-label="Top Sites">
      <h2 className={styles.Title}>Top sites</h2>
      <div className={styles.Grid}>
        {listToRender.map((s) => (
          <button key={s.url} className={styles.Item} onClick={() => open(s.url)}>
            <div className={styles.IconWrap}>
              <Icon url={s.url} size={24} alt={s.title || s.url} />
            </div>
            <div className={styles.Label} title={s.title || s.url}>
              {s.title || s.url}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TopSites;
