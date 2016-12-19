import { connect } from 'react-redux'
import * as routerActions from 'react-router-redux'
import * as promptActions from '../../../modules/prompts'
import * as popupActions from '../../../modules/popups'
import * as moduleActions from './AccountDetail.module.js'
import component from './AccountDetail.component.js'

const mapActionCreators = {
  ...routerActions,
  ...promptActions,
  ...popupActions,
  ...moduleActions
}

const mapStateToProps = (state) => ({
  data: state['account-detail'],
  resources: state['administrator'].resources,
  popups: state.popups
})

export default connect(mapStateToProps, mapActionCreators)(component)
