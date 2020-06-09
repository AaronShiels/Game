const config = {
    mode: "production",

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx"]
    },

    devServer: {
        port: 9000
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