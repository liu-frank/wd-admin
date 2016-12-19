import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'status-change',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./StatusChange.container').default
      const reducer = require('./StatusChange.module').default

      injectReducer(store, { key: 'status-change', reducer })

      next(null, Container)
    })
  }
})
