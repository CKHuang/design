const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

function now() {
    const d = new Date();
    const arr = [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ];
    return arr.map((item) => {
        return item > 9 ? String(item) : '0' + String(item)
    }).join('')
}

const _now = now()

fs.open('./config/env.js', 'w', function(err, fd) {
    if (err) throw err;
    const buf = `export default "${process.env.NODE_ENV ? process.env.NODE_ENV : 'developmentt'}";`;
    fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {
        fs.close(fd);
    });
});

module.exports = {
    _now: _now,
    entry: {
        main: './src-client/main',
        vendors: './src-client/vendors'
    },
    output: {
        path: path.join(__dirname, './dist/'+_now)
    },
    module: {
        rules: [{
                test: /.vue$/,
                use: [{
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                less: ExtractTextPlugin.extract({
                                    use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: ['autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    }
};