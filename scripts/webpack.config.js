const path = require('path');

// plugins
const webpack = require('webpack'); 
const jqueryPlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
});

module.exports = {
    devtool: 'eval-source-map',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve('../static/')
    },

    module: {
        rules: [
            {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },

    plugins: [
        jqueryPlugin
    ]
}