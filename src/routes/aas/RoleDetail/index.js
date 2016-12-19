import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'role-detail',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./RoleDetail.container').default
      const reducer = require('./RoleDetail.module').default

      injectReducer(store, { key: 'role-detail', reducer })
      next(null, Container)
    })
  }
})
