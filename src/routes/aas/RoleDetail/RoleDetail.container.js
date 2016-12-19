import { connect } from 'react-redux'
import * as routerActions from 'react-router-redux'
import * as promptActions from 'modules/prompts'
import * as popupActions from 'modules/popups'
import * as moduleActions from './RoleDetail.module'
import component from './RoleDetail.component'

const mapActionCreators = {
  ...routerActions,
  ...promptActions,
  ...popupActions,
  ...moduleActions
}

const mapStateToProps = (state) => ({
  data: state['role-detail'],
  resources: state['administrator'].resources,
  popups: state.popups
})

export default connect(mapStateToProps, mapActionCreators)(component)
