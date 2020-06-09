const config = {
    mode: "production",

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx"]
    },

    devServer: {
        port: 9000,
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                pathRewrite: { "^/api": "" }
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};

module.exports = config;