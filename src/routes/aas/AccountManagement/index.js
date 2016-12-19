import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'account-management',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const container = require('./AccountManagement.container').default
      const reducer = require('./AccountManagement.module').default

      injectReducer(store, { key: 'account-management', reducer })

      next(null, container)
    })
  }
})
