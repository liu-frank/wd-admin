import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'group-management',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const container = require('./GroupManagement.container').default
      const reducer = require('./GroupManagement.module').default

      injectReducer(store, { key: 'group-management', reducer })

      next(null, container)
    })
  }
})
