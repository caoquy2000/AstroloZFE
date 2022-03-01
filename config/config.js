// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN

    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  define: {
    API_BATCH_URL: 'https://20.124.25.10',
    API_URL: 'https://20.124.25.10',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user',

          routes: [
            {
              name: 'login',
              path: '/user/login',
              component: './user/Login',
            },
          ],
        },
        // {
        //   path: '/user/users',
        //   name: 'Users',
        //   icon: 'user',
        //   access: 'canAdmin',
        //   component: './user/users',
        // },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      access: 'canAdmin',
      component: './dashboard',
    },
    {
      path: '/admin',
      name: 'admin',
      icon: 'crown',
      access: 'canAdmin',
      component: './Admin',
      routes: [
        {
          path: '/admin/sub-page',
          name: 'sub-page',
          icon: 'smile',
          component: './Welcome',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/shop',
      name: 'Shop',
      icon: 'shop',
      routes: [
        {
          path: '/shop',
          redirect: '/shop/category',
        },
        {
          path: '/shop/category',
          name: 'Category',
          // icon: 'smile',
          access: 'canAdmin',
          component: './shop/category',
        },
        {
          path: '/shop/users',
          name: 'Users',
          // icon: 'user',
          access: 'canAdmin',
          component: './shop/users',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/astrology',
      name: 'Astrology',
      icon: 'snippets',
      // access: 'canAdmin',
      routes: [
        {
          path: '/astrology',
          redirect: '/astrology/zodiac',
        },
        {
          path: '/astrology/zodiac',
          name: 'Zodiac',
          // icon: 'smile',
          component: './astrology/zodiac',
        },
        {
          component: './404',
        },
      ],
    },
    {
      name: 'list.table-list',
      icon: 'table',
      path: '/list',
      component: './TableList',
    },
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
});
