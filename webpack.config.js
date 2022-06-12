const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserMinimizerPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ruleForJavaScriptAndReact = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    presets: [
      "@babel/preset-env",
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
  },
};

const ruleForHtml = {
  test: /\.html$/,
  use: { loader: "html-loader" },
};

const ruleForTailwindCSS = (isProduction) => {
  return {
    test: /\.css$/,
    use: [
      isProduction ? MiniCssExtractPlugin.loader : "style-loader",
      { loader: "css-loader", options: { importLoaders: 1 } },
      "postcss-loader",
    ],
  };
};

const plugins = (isProduction) => {
  const res = [
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "src/main/resources/react-js/template/index.html"
      ),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ];
  if (isProduction) {
    res.push(new CleanWebpackPlugin());
  }
  return res;
};

const config = (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === "production";
  const res = {
    entry: path.resolve(__dirname, "src/main/resources/react-js/index.js"),
    mode: mode,
    output: {
      path: path.resolve(__dirname, "src/main/resources/static/build"),
      filename: "bundle.[contenthash].js",
      // publicPath: "./", // ???
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        ruleForJavaScriptAndReact,
        ruleForHtml,
        ruleForTailwindCSS(isProduction),
      ],
    },
    plugins: plugins(isProduction),
  };

  if (isProduction) {
    res.optimization = {
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), new TerserMinimizerPlugin()],
    };
  } else {
    res.devtool = "source-map";
    res.devServer = {
      historyApiFallback: true,
      open: true,
      port: 3000,
      compress: true,
      static: {
        directory: path.join(__dirname, "src/main/resources/static/build"),
      },
      client: {
        overlay: true,
      },
    };
  }

  return res;
};

module.exports = config;
