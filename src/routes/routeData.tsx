import React, { lazy } from 'react';
import NotFound from '~/pages/404';

const Welcome = lazy(() => import('~pages/welcome'));

const page = ({ location }: any) => {
  return (
    <div>
      <h3>
        <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export interface routesConfigItem {
  path?: string
  exact?: boolean
  strict?: boolean
  component?: React.ReactNode
  selected?: string
  children?: routesConfigItem[]
  redirect?: string
  from?: string
  to?: string
}

const routes: routesConfigItem[] = [
  {
    from: "/",
    redirect: '/welcome',
    exact: true
  },
  {
    path: "/welcome",
    exact: true,
    component: Welcome,
    selected: 'home'
  },
  {
    path: "/c",
    exact: true,
    component: page,
    selected: '侧边栏111'
  },
  {
    path: "/d",
    exact: true,
    component: page,
    selected: '侧边栏2'
  },
  {
    path: "/e/:id",
    exact: true,
    component: page,
    selected: '侧边栏3'
  },
  {
    from: "*",
    redirect: '/404',
    exact: true,
    component: NotFound
  }
];


export default routes