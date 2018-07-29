const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlPlugin = require('html-webpack-plugin');


if (!global.Promise) {
    // For IE
    global.Promise = require('es6-promise').Promise;
}

const env = process.env;
const
    PRODUCTION = env.TARGET === 'production',
    LISTEN_HOST = env.LISTEN_HOST || 'localhost',
    LISTEN_PORT = env.LISTEN_PORT || 8085,
    PREFIX = env.PREFIX || '',
    GAPI_KEY = env.GAPI_KEY || 'AIzaSyBV_ijiRscpDdLmKn7RcPKrYiCixntbQtc';

const extractTextPlugin = new ExtractTextPlugin({
    filename: 'resources/style.css',
    allChunks: true
});

module.exports = {
    entry: [
        './src/index.js',
        './src/layout/scss/index.scss'
    ],
    output: {
        publicPath: PREFIX + '/',
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devtool: PRODUCTION ? false : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "css-loader",
                    {
                        loader: "autoprefixer-loader",
                        options: {
                            browsers: [
                                '> 5%',
                                'last 100 versions',
                                //'ie 6-8'
                            ],
                            add: true,
                            supports: true,
                            flexbox: true,
                            grid: true,
                            cascade: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.svg$/,
                exclude: /fonts/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            // extract: true,
                            spriteFilename: svgPath => `resources/sprite${svgPath.substr(-4)}`,
                            // symbolId: 'icon-[name]'
                        }
                    },
                ]
            },
            {
                test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                include: /fonts/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'resources/fonts/[name].[ext]',
                    }
                }]
            },
            {
                test: /\.gif$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'resources/images/[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'resources/images/[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'resources/images/[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ],
            }
        ]
    },
    plugins: [
        extractTextPlugin,
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
        new HtmlPlugin({
            title: 'YouTube client',
            template: './src/layout/index.template.ejs',
            filename: 'index.html',
            minify: PRODUCTION,
            hash: true,
            // favicon: './src/layout/images/favicon.png',
        }),
        new webpack.DefinePlugin({
            __GAPI_KEY: JSON.stringify(GAPI_KEY),
        })
    ],
    resolve: {
        extensions: [
            '.webpack.config.js',
            '.jsx',
            '.js',
            '.scss',
            '.css'
        ]
    },
    devServer: {
        host: LISTEN_HOST,
        port: LISTEN_PORT,
        historyApiFallback: {
            index: '/',
        },
        proxy: {
            [PREFIX + '/resources']: { // Because seems like historyApiFallback can't rewrite static URLs
                target: 'http://' + LISTEN_HOST + ':' + String(LISTEN_PORT),
                pathRewrite: {'^/': '/'},
            }
        },
        contentBase: __dirname + '/dist'
    }
};

if (PRODUCTION) {
    module.exports.plugins = module.exports.plugins || [];
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
