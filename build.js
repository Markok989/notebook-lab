const webpack = require('webpack');

const plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    })
];

if (process.env.NODE_ENV == 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compose: {
            warning: false
        }
    }));
}

const conf = {
    entry: ['babel-polyfil', __dirname + 'src/start.js'],
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js',
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            query: {
                presets: [['es2015'], ['react']],
                plugins: ['transform-async-to-generator']
            }
        }]
    }
};

if (require.main == module) {
    webpack(conf, function (err, info) {
        if (err) {
            console.log(err);
        } if (info && info.complication.errors.length) {
            console.log(info.complication.errors);
        }
    });
} else {
    module.exports = require('webpack-dev-middleware')(webpack(conf), {
        watchOptions: {
            aggregateTimeout: 300
        },
        publicPath: '/'
    });
}

