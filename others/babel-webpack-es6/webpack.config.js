//__dirname 获取当前项目的绝对路径，path.join(a, b)相当于 a+b
var path = require('path');
var webpack = require('webpack');
// console.log(process.cwd(), __dirname)  返回值相同
module.exports = {
    watch: true,
    devtool: "source-map",
    resolve: {
        extensions: ['', '.js', '.jsx', '.es6', '.less', '.scss', '.css'],
        root: path.join(__dirname, 'src/'),      // 获取项目的绝对路径
        alias: {
            testExports: path.join(__dirname, 'src/js/testExports_B'),
            jquery: path.join(__dirname, 'src/build/jquery-1.11.2')
        }
    },
    output: {
        publicPath: '/dist/'
    },
    // entry: {
    //     B1: "js/testExports_B",
    //     A1: 'js/testRequire_A'
    // },
    // output: {
    //     filename: "[name].chunk.js"
    // },
    // 用于加载外部js文件，不会打包到最终生成文件中
    // 需要在 html 文件中添加<script jquery>
    externals: {
        "$": "jQuery"
    },
    plugins: [
        // 会将入口文件中相同的require内容打包到common.js中
        new webpack.optimize.CommonsChunkPlugin("common.js"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    // 在js文件中可直接使用 $ 不需要再require('jquery')引入。会打包到最终生成文件中
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         "$": "jquery"
    //     })
    // ],
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.es6$/,
            loader: 'babel',
            exclude: /(node_modules)/,
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.less$/,
            // 需要安装 style-loader, css-loader, less-loader
            loader: "style!css!less"
        }, {
            test: /\.scss$/,
            // 需要安装 style-loader, css-loader, ruby, sass, node-sass, sass-loader
            loader: "style!css!sass"
        }, {
            test: /\.css$/,
            // 需要安装 style-loader, css-loader
            loader: "style!css"
        }, {
            test: /\.(png|jpg)$/,
            // 可以使用相对路径'../'相对于调用该图片的文件目录，或使用根目录'/'
            // 编译后调用图片的路径为 publicPath + name 会直接拼接字符串，不会根据../去匹配实际目录
            loader: 'url?limit=10000&name=images/[name].[ext]'
        }]
    }
};