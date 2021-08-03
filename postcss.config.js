module.exports = {
    plugins: [
        require('autoprefixer')({ 
            "overrideBrowserslist": [
                "defaults",
                "not IE 11",
                "not IE_Mob 11",
                "maintained node versions",
              ]
        })
    ]
};