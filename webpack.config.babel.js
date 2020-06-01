import path from "path";
import webpack from "webpack";
import ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";

const rootPath = path.resolve(__dirname, "./");
const srcPath = path.resolve(rootPath, "./src");

const { ABOUT_US_URL } = process.env;

if (!ABOUT_US_URL) {
    throw new Error("The About Us server address is not specified.");
}

module.exports = {
    entry: [
        "babel-polyfill",
        path.join(srcPath, "root/index.jsx"),
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: "[name].[contenthash].js",
        library: "about-us-client",
        libraryTarget: 'umd',
        publicPath: '/dist/',
        umdNamedDefine: true
    },
    resolve: {
        modules: [srcPath, "node_modules"],
        extensions: [".js", ".jsx"],
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        },
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                        ],
                        plugins: [
                            // "@babel/plugin-syntax-dynamic-import",
                            // Allows to declare static attributes in classes.
                            "@babel/plugin-proposal-class-properties",
                        ],
                    },
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextWebpackPlugin("[name].[hash].css"),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new webpack.EnvironmentPlugin({
            ABOUT_US_URL: JSON.stringify(ABOUT_US_URL),
        }),
    ],
};
