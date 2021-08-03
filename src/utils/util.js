import {store} from '../store'

export const formLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
}

export const uploadQiniuUrl = "https://upload.qiniup.com/";

export function formatMoney(text) {
    if (!text && text != 0) {
        return '-';
    } else {
        return '￥' + text.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

export function download(url, downloadName = "excel") {
    if (url && Object.prototype.toString.call(url) === '[object String]') {
        let a = document.createElement('a');
        a.href = encodeURI(url);
        a.download = downloadName;
        a.click();
    }
}

export function dispatchWithPromise(args){
    return new Promise((resolve, reject)=>{
        store.dispatch({...args, resolve, reject})
    })
}
