const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /\.lazy\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.lazy\.css$/i,
                use: [
                    {
                        loader: "style-loader",
                        options: { injectType: "lazyStyleTag" },
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", {targets: "defaults"}],
                            ]
                        }
                    },
                ],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ title: "Title" })],
    devtool: "inline-source-map",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    mode: "production",
};
