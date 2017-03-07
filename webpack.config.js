const config = {
    entry:{
        js:'./src/js/feedback.js'
    },
    output:{
        filename:'bundle.js',
        path:'./build'
    },
    module:{
        rules:[
            {
                test: /\.html$/,
                use: [ "html-loader" ]
            }
        ]
    }
}

module.exports = config;