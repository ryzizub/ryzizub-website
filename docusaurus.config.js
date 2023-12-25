// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ryzizub',
  tagline: 'Flutter Developer building mobile apps since 2016',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ryzizub.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'Doc', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  noIndex: true, // Remove after finish

  
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        // docs: {
        //   sidebarPath: './sidebars.js',
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        // title: 'Ryzizub website',
        // logo: {
        //   alt: 'Ryzizub logo',
        //   src: 'img/logo.png',
        // },
        // items: [

        // ],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Nostr',
                href: 'https://nostr.band/npub1eqmj85el4pkg7qdj2jcae24qykev5evnyz2s6pzdytzpkhga4u5sdmhexk',
              },
              {
                label: 'X (Twitter)',
                href: 'https://x.com/ryzizub',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/dominik-simonik/',
              },
            ],
          },
          {
            title: 'Dev & Fun',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ryzizub',
              },
              {
                label: 'Beer',
                href: 'https://untappd.com/user/ryzizub',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ryzizub, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
