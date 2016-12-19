import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '<%= dashesEntityName %>',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./<%= pascalEntityName %>.container').default
      const reducer = require('./<%= pascalEntityName %>.module').default

      injectReducer(store, { key: '<%= dashesEntityName %>', reducer })
      next(null, Container)
    })
  }
})
