'use strict'

const path = require('path')

module.exports = (api, options) => {
  const useThreads = process.env.NODE_ENV === 'production' && options.parallel

  api.chainWebpack(config => {
    config.resolveLoader.modules.prepend(
      path.join(__dirname, '../node_modules'),
    )

    if (!options.pages) {
      config
        .entry('app')
        .clear()
        .add('./src/main.ts')
    }

    config.resolve.extensions.merge(['.ts', '.tsx'])

    const tsRule = config.module.rule('ts').test(/\.ts$/)
    const tsxRule = config.module.rule('tsx').test(/\.tsx$/)

    // add a loader to both *.ts & vue<lang="ts">
    const addLoader = ({ loader, options }) => {
      tsRule
        .use(loader)
        .loader(loader)
        .options(options)
      tsxRule
        .use(loader)
        .loader(loader)
        .options(options)
    }

    addLoader({
      loader: 'cache-loader',
      options: api.genCacheConfig(
        'ts-babel-loader',
        {
          '@babel/core': require('@babel/core/package.json').version,
          '@babel/preset-typescript': require('@babel/preset-typescript/package.json')
            .version,
          typescript: require('typescript/package.json').version,
          modern: !!process.env.VUE_CLI_MODERN_BUILD,
          browserslist: api.service.pkg.browserslist,
        },
        ['tsconfig.json', 'babel.config.js', '.browserslistrc'],
      ),
    })

    if (useThreads) {
      addLoader({
        loader: 'thread-loader',
      })
    }

    addLoader({
      loader: 'babel-loader',
    })

    if (!process.env.VUE_CLI_TEST) {
      // this plugin does not play well with jest + cypress setup (tsPluginE2e.spec.js) somehow
      // so temporarily disabled for vue-cli tests
      config
        .plugin('fork-ts-checker')
        .use(require('fork-ts-checker-webpack-plugin'), [
          {
            async: false,
            vue: true,
            formatter: 'codeframe',
            useTypescriptIncrementalApi: true,
            // https://github.com/TypeStrong/ts-loader#happypackmode-boolean-defaultfalse
            checkSyntacticErrors: useThreads,
          },
        ])
    }
  })
}
