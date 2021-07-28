const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
    mode: process.env.NODE_ENV,
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "eventhandler.js",
        library: {
            name: 'EventHandler',
            type: 'umd',
            export: 'EventHandler'
          }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/env"]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [`*`, `.js`, `.json`]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [`**/*`]
        })
    ],
    target: "web",
    devtool: process.env.NODE_ENV === `production` ? false : `source-map`
}

module.exports = config
