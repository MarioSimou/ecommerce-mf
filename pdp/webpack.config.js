const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TSConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJSON = require('./package.json')
const deps = packageJSON.dependencies

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript"
                    ]
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                {
                    loader: 'file-loader',
                },
                ],
            }
        ]
    },
    resolve: {
        extensions: [
            ".tsx", ".ts", ".js", ".jsx", ".json"
        ],
        plugins: [
            new TSConfigPathsWebpackPlugin()
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "pdp",
            remotes: {
                'home': 'home@http://localhost:3000/federatedEntry.js'
            },
            shared: {
                ...deps,
                react: {
                    requiredVersion: deps.react,
                    singleton: true,
                },
                'react-dom': {
                    requiredVersion: deps['react-dom'],
                    singleton: true,
                },
                '@emotion/react': {
                    requiredVersion: deps['@emotion/react'],
                    singleton: true,
                },
                '@emotion/styled': {
                    requiredVersion: deps['@emotion/styled'],
                    singleton: true,
                },
                'framer-motion': {
                    requiredVersion: deps['framer-motion'],
                    singleton: true,
                }
            }
        }),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    devServer: {
        port: 3001,
        historyApiFallback: true,
    },
}