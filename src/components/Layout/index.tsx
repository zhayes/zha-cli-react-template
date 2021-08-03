import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb } from 'antd';
import SiderMenu from './SiderMenu/index';
import menuData from './SiderMenu/menuData';
import RoutesConfig from '~routes/index';
import SystemSetting from './SystemSetting';
import {Link} from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';

import Style from './index.less';

import { SAVE_SIDEMENUDATA } from '~/reducers/common';

const { Header, Content } = Layout;

function AppLayout(props:any) {

    const [collapsed, setCollapsed] = useState(false)

    function toggle() {
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        props.dispatch({type: SAVE_SIDEMENUDATA, data: menuData});
    }, [])

    return (
        <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
            {/* 侧边栏菜单 */}
            <SiderMenu collapsed={collapsed} />
            <Layout className={Style['site-layout']}>
                <Header className={Style['site-layout-background']} style={{ padding: 0, display: 'flex', alignItems: 'center', paddingRight: 16 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: Style.trigger,
                        onClick: toggle,
                    })}
                    <div style={{ flex: 1 }}></div>
                    {/* 用户退出系统，修改密码设置 */}
                    <SystemSetting />
                </Header>
                <div style={{padding: 16, fontSize: 14}}>
                    {/* 面包屑导航 */}
                    <Breadcrumb>
                        {
                            props.breadcrumb.map((item:string|{path:string, name: string})=>{
                                return (
                                    <Breadcrumb.Item key={typeof item=== 'string' ? item : item.name}>
                                        {typeof item=== 'string' ? item : <Link to={item.path}>{item.name}</Link>}
                                    </Breadcrumb.Item>
                                )
                            })
                        }
                    </Breadcrumb>
                </div>
                <Content
                    className={Style['site-layout-background']}
                    style={{
                        margin: '0 16px 24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <RoutesConfig />
                </Content>
            </Layout>
        </Layout>

    )

}

export default connect((state:any) => {
    const {breadcrumb} =  state.common;
    return {
        breadcrumb
    }
})(AppLayout)



