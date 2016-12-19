module.exports = {
  description () {
    return 'generates a page'
  },

  locals (options) {
    return {
      system: options.entity.options.system
    }
  },

  fileMapTokens () {
    return {
      __system__: (options) => {
        return options.locals.system
      }
    }
  }
}
