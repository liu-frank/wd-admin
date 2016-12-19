import { connect } from 'react-redux'
import * as promptActions from '../../../modules/prompts'
import * as popupActions from '../../../modules/popups'
import * as moduleActions from './ShortMessage.module'
import component from './ShortMessage.component'

const mapActionCreators = {
  ...promptActions,
  ...popupActions,
  ...moduleActions
}

const mapStateToProps = (state) => ({
  data: state['short-message'],
  popups: state.popups
})

export default connect(mapStateToProps, mapActionCreators)(component)
