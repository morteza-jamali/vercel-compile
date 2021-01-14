module.exports = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home/home",
      },
      {
        source: "/api/:tool/:lang",
        destination: "/api/handler",
      },
      {
        source: "/api",
        destination: "/api/handler",
      },
    ];
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new webpack.DefinePlugin({
        GLOBALS: JSON.stringify({
          TITLE: "ColorColl",
        }),
      })
    );

    return config;
  },
};
