/**
 * Created by hoon on 2017. 9. 11..
 */
const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: {
        app: path.resolve(__dirname, 'src/player/App.js')
    },
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', {modules: false}]
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    publicPath : '/static/',
                    name : 'images/[name].[ext]',
                    limit : 10000
                }
            },
            {
                test: /\.(mp4)$/,
                loader: 'file-loader',
                options: {
                    publicPath : '/static/',
                    name : 'videos/[name].[ext]',
                    limit : 1000000
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    publicPath : '/static/',
                    name : 'fonts/[name].[ext]',
                    limit : 10000
                }
            }
        ]
    },
    plugins : [
        new webpack.ProvidePlugin({
            $ : "jquery",
            jQuery : "jquery",
            _ : "underscore",
            videojs : ["video.js/dist/video.js"],
            "window.videojs" : ["video.js/dist/video.js"]
        }),
        new ExtractTextPlugin('css/[name].css')
    ]
};
module.exports = function(env) {
    return webpackMerge(config, require(`./webpack.${env}.js`));
};
