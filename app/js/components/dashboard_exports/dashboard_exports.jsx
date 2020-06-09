import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import TableauLoader from '../tableau_loader/tableau_loader'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss'

import './dashboard_exports.scss'
import { exportEnabled } from '../../services/auth'

const buttonStyle = { fontSize: '13px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }

const dashboardExportsStyles = {
  wrapper: { marginBottom: '30px' },
  button: buttonStyle,
  buttonExport: { ...buttonStyle, color: colours.brownishGrey },
  buttonToggle: { ...buttonStyle, width: '150px' },
}

class DashboardExports extends Component {
  constructor (props) {
    super(props)

    this.handleExport = this.handleExport.bind(this)

    this.openExportPopover = this.openExportPopover.bind(this)
    this.closeExportPopover = this.closeExportPopover.bind(this)

    this.exportImage = this.exportImage.bind(this)
    this.exportPDF = this.exportPDF.bind(this)
    this.exportCrosstab = this.exportCrosstab.bind(this)

    this.state = {
      exportPopoverOpen: false,
    }
  }

  openExportPopover (event) {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      exportPopoverOpen: true,
      anchorEl: event.currentTarget,
    })
  }

  closeExportPopover () {
    this.setState({
      exportPopoverOpen: false,
    })
  }

  exportImage () {
    this.closeExportPopover()
    this.props.exportImage()
  }

  exportPDF () {
    this.closeExportPopover()
    this.props.exportPDF()
  }

  exportCrosstab () {
    this.closeExportPopover()
    this.props.exportCrosstab()
  }

  handleExport (types) {
    if (Array.isArray(types)) {
      if (types.indexOf('Image') > -1) this.props.exportImage()
      if (types.indexOf('PDF') > -1) this.props.exportPDF()
      if (types.indexOf('Crosstab') > -1) this.props.exportCrosstab()
    }
  }

  render () {
    const { loading } = this.props

    return exportEnabled() && (
      <div>
        {loading && <div className='dashboard-filters__overlay'><TableauLoader /></div>}
        <FlatButton
          label='Export'
          icon={<FontIcon className='icon-export' style={{color: colours.tangerine, fontSize: '20px'}} />}
          onTouchTap={this.openExportPopover}
          style={dashboardExportsStyles.buttonExport}
          labelStyle={{textTransform: 'none !important'}}
          />
        <Popover
          open={this.state.exportPopoverOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.closeExportPopover}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <MenuItem primaryText="Image" onTouchTap={this.exportImage} />
            <MenuItem primaryText="PDF" onTouchTap={this.exportPDF} />
            <MenuItem primaryText="Crosstab" onTouchTap={this.exportCrosstab} />
          </Menu>
        </Popover>
      </div>
    )
  }
}

DashboardExports.propTypes = {
  loading: PropTypes.bool,
  // Actions
  exportImage: PropTypes.func.isRequired,
  exportPDF: PropTypes.func.isRequired,
  exportCrosstab: PropTypes.func.isRequired,
}

export default DashboardExports
