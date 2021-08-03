declare module '*.less' {
    const content: any;
    export default content;
}

declare module '*.css' {
    const content: any;
    export default content;
}

declare interface Window {
    axiosRequest: any
    previewWindow: any
}

declare const BASE_URL: string

declare const ENV_VAR: string

declare interface WebpackServerExtendModule extends NodeModule {
    hot?: any
}

declare interface NodeRequire extends NodeJS.Require {
    context: any
}

declare interface ResponseData {
    code: number
    data?: any
    message: string
}

declare interface Action {
    type: string | Symbol
    data?: any
}


declare interface SiderMenuItem {
    title: string
    icon?: React.ReactElement
    children?: SiderMenuItem[]
    path?: string,
    selected: string
}

declare interface SiderMenuItemList extends Array<SiderMenuItem> {

}

declare module 'ifanrx-react-ueditor';