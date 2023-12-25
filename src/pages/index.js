import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="text--center">
          <img src={require('@site/static/img/profile.jpeg').default} role="img" className={styles.profileImage} />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}>
      {/* description="Description will go into a meta tag in <head />"> */}
      <HomepageHeader />
      <main className={styles.heroBanner}>
        <p>👷‍♂️This site is a work in progress👷‍♂️</p>
        <Link
          className={styles.contactButton}
          href="mailto:dominik@simonik.me">Contact Me
        </Link>
      </main>
    </Layout>
  );
}
