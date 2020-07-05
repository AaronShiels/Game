const CopyPlugin = require('copy-webpack-plugin');

const config = (_, { mode }) => {
    // Determine environment
    mode = mode || "development";
    const isProduction = mode === "production";
    console.log(`Mode: ${mode}.`);

    // Derive configuration
    const devtool = isProduction ? false : "source-map";
    const devServer = {
        contentBase: './dist',
        port: 9000,
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                secure: false,
                ws: true
            }
        }
    };
    const resolve = {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    };
    const tsLoaderRule = {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: isProduction
                }
            }
        ]
    };
    const sourceMapLoaderRule = {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
    };
    const rules = isProduction ? [tsLoaderRule] : [tsLoaderRule, sourceMapLoaderRule];
    const copyPlugin = isProduction
        ? new CopyPlugin({
            patterns: [
                { from: "src/index.production.html", to: "index.html" }
            ]
        })
        : new CopyPlugin({
            patterns: [
                { from: "src/index.development.html", to: "index.html" }
            ]
        });
    const externals = {
        "react": "React",
        "react-dom": "ReactDOM"
    };

    return {
        mode,
        devtool,
        resolve,
        devServer,
        module: { rules },
        plugins: [copyPlugin],
        externals
    };
};

module.exports = config;