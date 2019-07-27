const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts')
module.exports = withFonts(withCSS({
    cssLoaderOptions: {
        url: false
    },
    webpack (config, options) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      })
      return config
    }
}))