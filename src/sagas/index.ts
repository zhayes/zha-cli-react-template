import { all, fork } from 'redux-saga/effects';

const context = require.context('./', true, /(\.js)|(\.ts)$/);
const keys = context.keys().filter((item:string)=> (item !== './index.js' && item!=='./index.ts'));
const sagas = [];

for (let i = 0; i < keys.length; i += 1) {
    sagas.push(context(keys[i]).default);
}

const sagasForks = sagas.map(saga => fork(saga));

export default function* rootSaga() {
  yield all(sagasForks);
}