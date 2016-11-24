'use strict';

//const webpack = require('./webpack');

module.exports = {
    context: __dirname + '/js',
    entry: {
        feed: './feed/feed'
    },
    output: {
        path: __dirname + '/../static/js',
        filename: 'feed.js'
        //library: '[name]'
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'inline-source-map',

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel?presets[]=es2015'
        }]
    }

};
/*

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    ],

    resolve: {
        modulesDirectories: ['node_modules'], // Где искать модули
        extensions: ['', '.js'] // С какими расширениями
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'], // Где искать лоадеры
        moduleTemplates: ['*-loader', '*'], // Шаблон поиска
        extensions: ['', '.js'] // С какими расширениями
    },

    */



/*if (false) {
    module.exports.plugins.push(

    )
}*/