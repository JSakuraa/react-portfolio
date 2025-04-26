module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Add rule to handle .mjs files
        webpackConfig.module.rules.push({
          test: /\.mjs$/,
          type: 'javascript/auto',
          exclude: /node_modules/,
        });
  
        return webpackConfig;
      },
    },
    babel: {
      plugins: [
        // This plugin ensures proper handling of ES Modules for older React versions or non-ESM-compatible setups.
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
    style: {
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
  };