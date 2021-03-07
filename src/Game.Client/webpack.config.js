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
    const cssLoaderRule = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    };
    const sourceMapLoaderRule = {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
    };
    const rules = isProduction ? [tsLoaderRule, cssLoaderRule] : [tsLoaderRule, cssLoaderRule, sourceMapLoaderRule];
    const copyPluginPatterns = isProduction
        ? [{ from: "src/index.production.html", to: "index.html" }]
        : [{ from: "src/index.development.html", to: "index.html" }];
    const copyPluginConfig = new CopyPlugin({ patterns: copyPluginPatterns });
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
        plugins: [copyPluginConfig],
        externals
    };
};

module.exports = config;