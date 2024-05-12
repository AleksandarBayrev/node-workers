// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    target: 'node',
    entry: './build/cpu-stress.js',
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'cpu-stress.js'
    },
    plugins: [],
    module: {
        rules: [],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
