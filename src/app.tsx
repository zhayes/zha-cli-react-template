
import React, { Suspense, lazy } from 'react';
import getStore, { history } from './store';
import { Provider } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { Spin, ConfigProvider} from 'antd';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import PrivateComponent from './components/PrivateComponent';
import { hot } from 'react-hot-loader';
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.less';

const appStore = getStore();
const persistor = persistStore(appStore);

const Login = lazy(() => import('~pages/login'));
const AppLayout = lazy(() => import('~components/Layout'));
const NotFound = lazy(() => import('~pages/404'));


class App extends React.Component {
    render() {
        return (
            <Provider store={appStore}>
                <PersistGate persistor={persistor}>
                    <ConfigProvider locale={zhCN}>
                        <ConnectedRouter history={history}>
                            <Suspense fallback={<Spin size="large"><div style={{ minHeight: '100vh', minWidth: '100vw' }}></div></Spin>}>
                                <Switch>
                                    <Route path="/404" exact component={NotFound}></Route>
                                    <Route path="/login" exact component={Login}></Route>
                                    <PrivateComponent>
                                        <Route path="/*" exact component={AppLayout}></Route>
                                    </PrivateComponent>
                                </Switch>
                            </Suspense>
                        </ConnectedRouter>
                    </ConfigProvider>
                </PersistGate>
            </Provider>
        )
    }
}

export default hot(module)(App);