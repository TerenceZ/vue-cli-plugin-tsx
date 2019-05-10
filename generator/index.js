module.exports = (api, _, __, invoking) => {
  api.extendPackage({
    devDependencies: {
      '@babel/preset-typescript': '^7.3.3',
      'babel-plugin-macros': '^2.5.1',
      'vue-tsx.macro': '^0.0.2',
      typescript: '^3.4.5',
    },
  })

  // late invoke compat
  if (invoking) {
    if (api.hasPlugin('unit-mocha')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-unit-mocha/generator').applyTS(api)
    }

    if (api.hasPlugin('unit-jest')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-unit-jest/generator').applyTS(api)
    }

    if (api.hasPlugin('eslint')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-eslint/generator').applyTS(api)

      api.extendPackage({
        'lint-staged': {
          '*.{js,jsx,ts,tsx,vue}': ['vue-cli-service lint', 'git add'],
          '*.{d.ts,css,scss,json,md}': ['vue-cli-service lint', 'git add'],
        },
      })
    }
  }

  api.render('./template', {
    isTest: process.env.VUE_CLI_TEST || process.env.VUE_CLI_DEBUG,
    hasMocha: api.hasPlugin('unit-mocha'),
    hasJest: api.hasPlugin('unit-jest'),
  })

  api.postProcessFiles(files => {
    const jsRE = /\.js$/
    const excludeRE = /^tests\/e2e\/|(\.config|rc)\.js$/

    for (const file in files) {
      if (jsRE.test(file) && !excludeRE.test(file)) {
        const tsFile = file.replace(jsRE, '.ts')
        if (!files[tsFile]) {
          let content = files[file]
          if (tsLint) {
            content = convertLintFlags(content)
          }
          files[tsFile] = content
        }
        delete files[file]
      }
    }
  })
}
