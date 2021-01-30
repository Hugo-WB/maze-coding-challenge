const path = require("path");

module.exports = {
  // mode:"production",
  // mode:"development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    publicPath: "/dist/",
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
