const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require("webpack");
const { banner } = require('./license');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/index.ts')
    ],
    devtool: 'source-map',
    target: "node",
    mode: process.env.NODE_ENV || 'development',
    optimization: {
        // We no not want to minimize our code.
        minimize: false,
        // do not set NODE_ENV
        nodeEnv: false
    },
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader'
            }
        }]
    },
    resolve: {
        extensions: ['.ts'],
        alias: {
            "~": path.join(__dirname),
            "@": path.join(__dirname, 'src'),
        },
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, process.env.NODE_ENV == "production" ? "dist" : 'bin'),
        pathinfo: true,
        library: 'Mahal-Creator',
        libraryTarget: "commonjs2",

    },
    plugins: [
        new webpack.BannerPlugin({
            banner: banner,
        }),
        new webpack.BannerPlugin({
            banner: "#!/usr/bin/env node",
            raw: true
        }),
    ],
    externals: [nodeExternals()]
};