import React from 'react';
import QuickLink, { QuickLinkItem } from './QuickLink';
import styles from './QuickLinksWidget.module.scss';

// Comment: Renders a single widget with title and grid of links
// Comments are in English per your rule.

export type QuickLinksWidgetModel = {
  name: string;
  links: QuickLinkItem[];
};

export type QuickLinksWidgetProps = {
  widget: QuickLinksWidgetModel;
  iconSize?: number;
};

const QuickLinksWidget: React.FC<QuickLinksWidgetProps> = ({ widget, iconSize = 16 }) => {
  return (
    <section className={styles.QuickLinksWidget}>
      {widget.name && <h2 className={styles.QuickLinksWidgetTitle}>{widget.name}</h2>}
      <div className={styles.QuickLinksWidgetLinks}>
        {widget.links?.map((link, idx) => (
          <QuickLink key={`${link.url}-${idx}`} link={link} size={iconSize} />
        ))}
      </div>
    </section>
  );
};

export default QuickLinksWidget;