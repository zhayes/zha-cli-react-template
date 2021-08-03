import React, { lazy, Suspense } from 'react';
import { Route, Redirect, Switch} from "react-router-dom";
import { Spin } from 'antd';
import routes from './routeData';

export const routeData = routes;

export default () => {
  return (
    <Suspense fallback={<Spin size="large"><div></div></Spin>}>
      <Switch>
        {
          routeData.map((route: any, i) => {
            return (
              route.redirect ?
                <Redirect
                  key={i}
                  from={route.from}
                  to={route.redirect}
                  exact={route.exact}
                  strict={route.strict}
                />
                :
                <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  strict={route.strict}
                  render={props => (
                    <route.component {...props} />
                  )}
                />
            );
          })
        }
      </Switch>
    </Suspense>
  )
}