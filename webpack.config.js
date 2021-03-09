'use strict';

const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: './index.js',
        path: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ]
            }, 
            {//暴露$和jQuery到全局
                test: require.resolve('jquery'), //require.resolve 用来获取模块的绝对路径
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        inline: true,
        open: true,
        historyApiFallback: true,
        host: '127.0.0.1',
        port: '5000',
        compress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
};