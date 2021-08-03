const path = require('path');
import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { connectRouter } from 'connected-react-router';

 // WHITELIST
export const persistConfig = {
  key: '__info__',
  storage: storage,
  whitelist: ['loginInfo', 'lastFetchedTime']
};


const context = require.context('./', true, /(\.js)|(\.ts)$/);
const keys = context.keys().filter((item:string)=> (item.indexOf('index')===-1));
const reducers:any = {};

keys.forEach((k:string) => {
  const fileBaseName = path.basename(k, path.extname(k));
  reducers[fileBaseName] = context(k).default;
});

const createRootReducer = (history:any) => combineReducers({
  ...reducers,
  common: persistReducer(persistConfig, reducers.common),
  router: connectRouter(history)
})

export default createRootReducer