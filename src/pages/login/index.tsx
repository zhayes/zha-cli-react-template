import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import {connect} from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import VerificationCodeInput from '~components/VerificationCodeInput';
import {FETCH_LOGIN_INFO, FETCH_CODEURL} from '~reducers/common';
import {dispatchWithPromise} from '~utils/index';
import { Redirect } from 'react-router';

import Style from './index.less';

const LoginPage = ({loginInfo, img, imgKey}:any) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    function submitHandle(){
        form.validateFields().then((values)=>{
            setSubmitting(true);
            values.imgKey = imgKey;
            dispatchWithPromise({type: FETCH_LOGIN_INFO, payload: values}).catch(()=>{
                setSubmitting(false);
                dispatchWithPromise({type: FETCH_CODEURL})
            });
        })
    }

    useEffect(()=>{
        setSubmitting(submitting)
    }, [submitting])

    return (
        loginInfo ?
        <Redirect to="/welcome"/>
        :
        <div className={Style["login_container"]}>
            <h1 className={Style["system_title"]}>系统登录</h1>
            <div className={Style["system_title_underline"]}></div>
            <div className={Style["login_form"]}>
                <Form layout="vertical" form={form}>
                    <Form.Item name="accountName" rules={[{ required: true, message: '请输入帐号' }]}>
                        <Input size="large" placeholder="请输入帐号" prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                        <Input type="password" size="large" placeholder="请输入密码" prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item name="imgCode" rules={[{ required: true, message: '请输入验证码' }]}>
                        <VerificationCodeInput size="large" url={img} placeholder="请输入验证码" />
                    </Form.Item>

                    <Button htmlType="submit" loading={submitting} type="primary" block size="large" onClick={submitHandle}>登录</Button>
                </Form>
            </div>
        </div>
    )
}

export default connect((state:any)=>{
    const {img, imgKey, loginInfo} = state.common;
    return {
        img,
        imgKey,
        loginInfo
    }
})(LoginPage)