const CopyPlugin = require('copy-webpack-plugin');

const config = (env, { mode }) => {
    mode = mode || "development";
    console.log(`Mode: ${mode}.`);

    return {
        mode,

        devtool: "source-map",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },

        devServer: {
            port: 9000,
            proxy: {
                "/api": {
                    target: "http://localhost:5000",
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

        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: "src/index.html", to: "index.html" }
                ]
            })
        ],

        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        }
    };
};

module.exports = config;