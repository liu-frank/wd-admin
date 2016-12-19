import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'role-management',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./RoleManagement.container').default
      const reducer = require('./RoleManagement.module').default

      injectReducer(store, { key: 'role-management', reducer })

      next(null, Container)
    })
  }
})
