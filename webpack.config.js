const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            scriptLoading: 'blocking',
        }),
    ],
};
