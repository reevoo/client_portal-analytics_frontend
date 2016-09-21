import { connect } from 'react-redux'
import LeftHandNav from '../components/left_hand_nav/left_hand_nav.jsx'
import React, { PropTypes } from 'react'

const LeftHandNavContainer = ({ dashboards, leftHandNavVisible, selectedDashboardId }) => (
  <LeftHandNav
    dashboards={dashboards}
    leftHandNavVisible={leftHandNavVisible}
    selectedDashboardId={selectedDashboardId}
  />
)

LeftHandNavContainer.propTypes = {
  dashboards: PropTypes.arrayOf(PropTypes.object).isRequired,
  leftHandNavVisible: PropTypes.bool.isRequired,
  selectedDashboardId: PropTypes.string,
}

const mapStateToProps = ({ analyticsApp, router }) => ({
  leftHandNavVisible: analyticsApp.leftHandNavVisible,
  dashboards: analyticsApp.dashboards,
  selectedDashboardId: router.params ? router.params.id : null,
})

export default connect(mapStateToProps)(LeftHandNavContainer)
