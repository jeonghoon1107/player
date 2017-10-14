/**
 * Created by hoon on 2017. 9. 11..
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: false,
                keep_fnames: true
            },
            compress: {
                screw_ie8: false
            },
            output: {
                screw_ie8: false
            },
            comments: false
        })
    ]
};