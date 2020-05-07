const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = {
    //入口， __dirname 是当前文件所在目录
    entry: path.join(__dirname, 'src/index.js'),
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'element-ui': 'ELEMENT',
    },
    //输出
    output: {
        publicPath: '/',
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    //webpack原生只支持js文件类型，只支持ES5语法，我们使用以.vue文件名结尾的文件时，需要为其指定loader
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            "@babel/preset-env"
                        ],
                        "plugins": [
                            "transform-vue-jsx"
                        ]
                    }
                }
            },
            //将小于1024d的图片转为base64，减少http请求
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]',
                        outputPath: 'assets/images'
                    }
                }
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'assets/media/[name].[hash:7].[ext]'
                    }
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'assets/fonts/[name].[hash:7].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HTMLPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],

    optimization: {
        splitChunks: {
            chunks(chunk) {
                // exclude `my-excluded-chunk`
                return chunk.name !== 'my-excluded-chunk';
            }
        }
    }
}

if (isDev) {
    config.module.rules.push(
        //css预处理器，使用模块化的方式写css代码
        //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
        {
            test: /\.styl/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {sourceMap: true}
                },
                'stylus-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        url: true
                    }
                },
            ]
        });
    config.devServer = {
        publicPath: '/',
        historyApiFallback: {
            index: '/index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
        },
        port: 8081,
        proxy: {
            '/api': {
               // target: 'http://cheng1111.utools.club/',
                target: 'https://siushare.com/',
               // target: 'http://localhost:8080/',
                //target: 'http://47.240.107.122/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/app': {
                target: 'http://localhost:808/',
                changeOrigin: true,
                pathRewrite: {
                    '^/app': ''
                }
            },
        },
        overlay: {
            errors: true
        },
        hot: true
    }
} else {

    config.output.filename = '[name].[hash:8].js';
    config.module.rules.push(
        //css预处理器，使用模块化的方式写css代码
        //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
        {
            test: /\.styl/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: '/',
                        hmr: process.env.NODE_ENV === 'development',
                    },
                },
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {sourceMap: true}
                },
                'stylus-loader'
            ]
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                MiniCssExtractPlugin.loader,
                'css-loader'

            ]
        }
    );

    config.plugins.push(
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'styles.[chunkhash].[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    );
}

module.exports = config;
