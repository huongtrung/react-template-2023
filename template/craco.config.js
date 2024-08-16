/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path")
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: config => ({
      ...config,
      module: {
        ...config.module,
        rules: config.module.rules.map(rule => {
          if (rule.oneOf instanceof Array) {
            // eslint-disable-next-line no-param-reassign
            rule.oneOf[rule.oneOf.length - 1].exclude = [
              /\.(js|mjs|jsx|cjs|ts|tsx)$/,
              /\.html$/,
              /\.json$/,
            ];
          }
          return rule;
        }),
      },
    }),
  },
}
