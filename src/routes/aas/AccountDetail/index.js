import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'account-detail',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./AccountDetail.container.js').default
      const reducer = require('./AccountDetail.module.js').default

      injectReducer(store, { key: 'account-detail', reducer })
      next(null, Container)
    })
  }
})
