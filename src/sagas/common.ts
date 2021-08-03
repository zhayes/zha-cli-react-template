import { call, put, takeEvery, takeLatest, all, fork } from 'redux-saga/effects';
import AxiosRequest from '~utils/request';
import {
  FETCH_CODEURL, 
  SAVE_CODEURL,
  SAVE_LOGIN_INFO, 
  FETCH_LOGIN_INFO, 
  UPDATE_PASSWORD, 
  SAVE_PERMISSIONS, 
  FETCH_PERMISSIONS, 
  FETCH_REFRESH_TOKEN
} from '~reducers/common';

import { push } from 'connected-react-router';
const post = new AxiosRequest().post;

//获取验证码
function* getCodeUrl() {
  yield takeLatest(FETCH_CODEURL, function* ({ payload, resolve, reject }:any) {
    try {
      const response = yield call(post, '/xxx', payload);
      const {imgKey, img} = response.data || {};
      yield put({
        type: SAVE_CODEURL,
        data: {
          imgKey,
          img
        }
      })
      resolve && resolve(imgKey)
    } catch (error) {
      yield put({
        type: SAVE_CODEURL,
        data: null
      })
      reject && reject(error)
    }
  })
}

//登录
function* getLoginInfo() {
  yield takeLatest(FETCH_LOGIN_INFO, function* ({ payload, resolve, reject }:any) {
    try {
      const response = yield call(post, '/xxx', payload);
      const data = response.data;
      yield put({
        type: SAVE_LOGIN_INFO,
        data
      });
      yield put(push('/welcome'));
      resolve && resolve(data)
    } catch (error) {
      yield put({
        type: SAVE_LOGIN_INFO,
        data: null
      })
      reject && reject(error)
    }
  })
}

//修改密码
function* updatePassword() {
  yield takeEvery(UPDATE_PASSWORD, function* ({ payload, resolve, reject }:any) {
    try {
      const response = yield call(post, '/xxx', payload);
      resolve && resolve(response.data)
    } catch (error) {
      reject && reject(error)
    }
  })
}

//获取权限
function* getPermissions(){
  yield takeEvery(FETCH_PERMISSIONS, function* ({ payload, resolve, reject }:any) {
    try {
      const response = yield call(post, '/xxx', payload);
      yield put({type: SAVE_PERMISSIONS, data: response.data.list});
      resolve && resolve(response.data)
    } catch (error) {
      reject && reject(error)
    }
  })
}

//刷新token接口
function* refreshToken(){
  yield takeEvery(FETCH_REFRESH_TOKEN, function* ({ payload, resolve, reject }:any) {
    try {
      const response = yield call(post, '/xxx', payload);
      yield put({type: SAVE_LOGIN_INFO, data: response.data});
      resolve && resolve(response.data);
    } catch (error) {
      reject && reject(error)
    }
  })
}


export default function* commonFLow() {
  yield all([
    fork(getCodeUrl),
    fork(getLoginInfo),
    fork(updatePassword),
    fork(getPermissions),
    fork(refreshToken)
  ])
}
