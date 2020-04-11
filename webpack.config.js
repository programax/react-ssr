const path = require('path');

const common = {
    mode: 'development',

    context: path.resolve(__dirname, 'src/client'),

    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css/,
                use: [
                    // 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            onlyLocals: true,
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                        },
                    },
                ]
            },
        ],
    },

    devtool: 'inline-source-map',
};

module.exports = [
    {
        ...common,

        entry: {
            bundle: './index.js',
        },

        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'dist/static'),
            filename: '[name].js'
        },
    },
    {
        ...common,

        target: 'node',

        entry: {
            lib: './lib.js',
        },

        output: {
            libraryTarget: 'umd',
            path: path.resolve(__dirname, 'dist/static'),
            filename: '[name].js'
        },

        externals: [
            'react',
            'react-dom',
        ],
    }
];
