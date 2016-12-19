import { connect } from 'react-redux'
import HomeView from './HomeView'

const mapStateToProps = (state) => ({
  administrator: state['administrator']
})

export default {
  component: connect(mapStateToProps)(HomeView)
}

