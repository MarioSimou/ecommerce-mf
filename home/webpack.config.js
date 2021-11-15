const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TSConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const packageJSON = require('./package.json')
const deps = packageJSON.dependencies
const dotenv = require('dotenv')

dotenv.config({
    path: `.env.${process.env.NODE_ENV.toLocaleLowerCase()}`
})

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
            name: "home",
            filename: 'federatedEntry.js',
            exposes: {
                './components/Header': './src/components/shared/Header/index.tsx'
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
            }
        }),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new DefinePlugin({
            REACT_APP_API_KEY: JSON.stringify(process.env.REACT_APP_API_KEY),
            REACT_APP_AUTH_DOMAIN: JSON.stringify(process.env.REACT_APP_AUTH_DOMAIN),
            REACT_APP_PROJECT_ID: JSON.stringify(process.env.REACT_APP_PROJECT_ID),
            REACT_APP_STORAGE_BUCKET: JSON.stringify(process.env.REACT_APP_STORAGE_BUCKET),
            REACT_APP_MESSAGING_SENDER_ID: JSON.stringify(process.env.REACT_APP_MESSAGING_SENDER_ID),
            REACT_APP_APP_ID: JSON.stringify(process.env.REACT_APP_APP_ID)
        })
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
}