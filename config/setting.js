module.exports = {
    dev:{//测试接口地址
        BASE_URL:"dev-xxx"
    },
    prod:{//正式接口地址
        BASE_URL:"prod-xxx"
    },
    request:{
        //token最长有效时效两个小时，单位秒
        maxExpiresIn: 2*3600,
        //过滤特定的接口地址，以下路径不进入重复取消队列
        API_whiteList: [

        ],
        //特定接口不需要走刷新token的时机判断
        specifyApiInOutOfRefreshingCode: [
            '/mgt/gov/user/refresh-token'
        ]
    }
}