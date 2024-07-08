import { defineConfig } from 'dumi';
import path from 'path';
import rehypeAntd from './.dumi/rehypeAntd';
import remarkAntd from './.dumi/remarkAntd';
import { version } from './package.json';

export default defineConfig({
  conventionRoutes: {
    // to avoid generate routes for .dumi/pages/index/components/xx
    // exclude: [new RegExp('index/components/')],
  },
  ssr: false,
  hash: true,
  crossorigin: {},
  https: {
    cert: 'aepay.pem',
    key: 'aepay.pem'
  },
  outputPath: 'docs-dist',
  base: '/ae-fe/aepay-pkg/',
  publicPath: '/ae-fe/aepay-pkg/',
  favicons: ['https://pages.alibaba-inc.com/xuhang.xu/ae-docs/logo.svg'],
  resolve: {
    docDirs: [{ type: 'doc', dir: 'docs' }],
    atomDirs: [
      { type: 'component', dir: 'components/aepay-ui/src' },
      { type: 'hooks', dir: 'packages/aepay-hooks/src' },
      { type: 'utils', dir: 'packages/aepay-utils/src' },
      { type: 'utils/cache-card', dir: 'packages/cache-card/docs' },
      { type: 'component', dir: 'components/ekyc-face/src' },
      { type: 'component', dir: 'components/aepay-chart/src' },
      { type: 'component', dir: 'docs/components' },
    ],
    codeBlockMode: 'passive',
  },
  locales: [
    { id: 'en-US', name: 'English', suffix: '' },
    { id: 'zh-CN', name: '中文', suffix: '-cn' },
  ],
  define: {
    antdReproduceVersion: version,
  },
  alias: {
    '@ali/aepay-ui': path.join(__dirname, 'components/aepay-ui/src/index.ts'),
    '@ali/aepay-hooks': path.join(__dirname, 'packages/aepay-hooks/src/index.ts'),
    '@ali/aepay-utils': path.join(__dirname, 'packages/aepay-utils/src/index.ts'),
    '@ali/aepay-ekyc-face': path.join(__dirname, 'components/ekyc-face/src/index.ts'),
    '@ali/aepay-chart': path.join(__dirname, 'components/aepay-chart/src/index.ts'),
  },
  extraRehypePlugins: [rehypeAntd],
  extraRemarkPlugins: [remarkAntd],
  extraBabelPresets: [require.resolve('@emotion/babel-preset-css-prop')],
  mfsu: false,
  metas: [{ name: 'theme-color', content: '#1677ff' }],
  analytics: {
    ga_v2: 'UA-72788897-1',
  },
  clickToComponent: {
    editor: 'vscode'
  },
  headScripts: [
    `
    (function () {
      function isLocalStorageNameSupported() {
        const testKey = 'test';
        const storage = window.localStorage;
        try {
          storage.setItem(testKey, '1');
          storage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
      }
      // 优先级提高到所有静态资源的前面，语言不对，加载其他静态资源没意义
      const pathname = location.pathname;

      function isZhCN(pathname) {
        return /-cn\\/?$/.test(pathname);
      }
      function getLocalizedPathname(path, zhCN) {
        const pathname = path.indexOf('/') === 0 ? path : '/' + path;
        if (!zhCN) {
          // to enUS
          return /\\/?index(-cn)?/.test(pathname) ? '/' : pathname.replace('-cn', '');
        } else if (pathname === '/') {
          return '/index-cn';
        } else if (pathname.indexOf('/') === pathname.length - 1) {
          return pathname.replace(/\\/$/, '-cn/');
        }
        return pathname + '-cn';
      }

      // 兼容旧的 URL， \`?locale=...\`
      const queryString = location.search;
      if (queryString) {
        const isZhCNConfig = queryString.indexOf('zh-CN') > -1;
        if (isZhCNConfig && !isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, isZhCNConfig);
        }
      }

      if (isLocalStorageNameSupported() && (pathname === '/' || pathname === '/index-cn')) {
        const lang =
          (window.localStorage && localStorage.getItem('locale')) ||
          ((navigator.language || navigator.browserLanguage).toLowerCase() === 'zh-cn'
            ? 'zh-CN'
            : 'en-US');
        // safari is 'zh-cn', while other browser is 'zh-CN';
        if ((lang === 'zh-CN') !== isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, lang === 'zh-CN');
        }
      }
      document.documentElement.className += isZhCN(pathname) ? 'zh-cn' : 'en-us';

      window.mtopConfig = {
        "prefix": "",
        "subDomain": "pre-aepay-sg-acs",
        "mainDomain": "aliexpress.com",
        "appKey": "12574478"
      }
    })();
    `,
    'https://assets.alicdn.com/g/code/lib/??react/17.0.2/umd/react.development.js,react-dom/17.0.2/umd/react-dom.development.js',
    'https://assets.alicdn.com/g/code/lib/alifd__next/1.25.51/next.min.js'
  ],
  links: [
    {
      rel: 'stylesheet',
      href: 'https://assets.alicdn.com/g/intl-dada/dada-theme-csp-seller/0.28.1/index.css',
    },
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@alifd/next': 'Next',
  },
});
