import { connect } from 'react-redux'
import CPDrawer from '../components/cp_drawer/cp_drawer.jsx'

const mapStateToProps = (state) => ({
  drawerVisible: state.drawerVisible,
})

export default connect(
  mapStateToProps
)(CPDrawer)
