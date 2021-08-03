
interface FormatMoneyFunc{
    (text:string):string
}
export const formatMoney:FormatMoneyFunc

interface DownloadFunc{
    (url:string, txtName:string):void
}
export const download:DownloadFunc

interface DispatchWithPromiseFuncArgs{
    type:any
    payload?:any
    data?:any
}

interface DispatchWithPromiseFunc{
    (args:DispatchWithPromiseFuncArgs):Promise<any>
}

export const dispatchWithPromise:DispatchWithPromiseFunc

export const uploadQiniuUrl:string