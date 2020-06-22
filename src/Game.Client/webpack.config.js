const config = {
    mode: "production",

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    devServer: {
        port: 9000,
        proxy: {
            "/api": {
                target: "https://localhost:5001",
                pathRewrite: { "^/api": "" },
                secure: false,
                ws: true
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