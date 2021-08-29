const path = require("path");
module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "UI", "index.js"),
    resolve: {
        extensions: [".js", ".jsx"]
    },
    target:"web",
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"

            },
            {
                test: /\.jsx$/,
                loader: "babel-loader"

            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "assets", "js"),
        filename: "main.js"
    }
};