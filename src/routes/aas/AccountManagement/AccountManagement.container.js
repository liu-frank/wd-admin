import { connect } from 'react-redux'
import * as routerActions from 'react-router-redux'
import * as promptActions from '../../../modules/prompts'
import * as popupActions from '../../../modules/popups'
import * as moduleActions from './AccountManagement.module'
import component from './AccountManagement.component'

const mapActionCreators = {
  ...routerActions,
  ...promptActions,
  ...popupActions,
  ...moduleActions
}

const mapStateToProps = (state) => ({
  data: state['account-management'],
  resources: state['administrator'].resources,
  popups: state.popups
})

export default connect(mapStateToProps, mapActionCreators)(component)
