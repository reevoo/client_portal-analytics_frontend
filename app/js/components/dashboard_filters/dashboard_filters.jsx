import React, { Component, PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import CustomViewDialog from '../dialogs/custom_view_dialog/custom_view_dialog'
import CustomViewsListDialog from '../dialogs/custom_views_list_dialog/custom_views_list_dialog'
import FilterPreview from '../filter_preview/filter_preview'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss'

import './dashboard_filters.scss'

const dashboardFiltersStyle = {
  marginBottom: '30px',
}

const headerStyle = {
  borderBottom: `1px solid ${colours.whiteFour}`,
  padding: 0,
}

const headerToolbarStyle = {
  backgroundColor: 'transparent',
  height: '78px',
}

const headerToolbarGroupStyle = {
  alignItems: 'center',
}

const headerToolbarSeparatorStyle = {
  backgroundColor: colours.whiteFour,
  height: '50px',
  marginLeft: '15px',
  marginRight: '25px',
  top: 0,
}

const footerStyle = {
  borderTop: `1px solid ${colours.whiteFour}`,
  padding: 0,
  textAlign: 'right',
}

const footerToolbarStyle = {
  backgroundColor: 'transparent',
  height: '68px',
}

const footerToolbarGroupStyle = {
  alignItems: 'center',
}

const footerToolbarSeparatorStyle = {
  backgroundColor: colours.whiteFour,
  height: '100%',
  marginLeft: '15px',
  marginRight: '18px',
  top: 0,
}

const buttonStyle = {
  fontSize: '13px',
  margin: 0,
}

const selectedViewTitle = {
  color: colours.reevooOrange,
  fontSize: '22px',
  lineHeight: 'auto',
}

class DashboardFilters extends Component {
  constructor () {
    super()

    this.handleFilterChange = this.handleFilterChange.bind(this)

    this.removeView = this.removeView.bind(this)
    this.saveView = this.saveView.bind(this)
    this.setDefaultView = this.setDefaultView.bind(this)
    this.showView = this.showView.bind(this)

    this.closeEditDialog = this.closeEditDialog.bind(this)
    this.openEditDialog = this.openEditDialog.bind(this)
    this.closeListDialog = this.closeListDialog.bind(this)
    this.openListDialog = this.openListDialog.bind(this)

    this.state = {
      listOpen: false,
      editOpen: false,
    }
  }

  closeEditDialog () {
    this.setState({ editOpen: false })
  }

  openEditDialog () {
    this.setState({ editOpen: true })
  }

  closeListDialog () {
    this.setState({ listOpen: false })
  }

  openListDialog () {
    this.setState({ listOpen: true })
  }

  removeView (name) {
    this.props.removeView(name)
  }

  saveView (name) {
    this.props.saveView(name)
    this.closeEditDialog()
  }

  setDefaultView (name) {
    this.props.setDefaultView(name)
    this.closeListDialog()
  }

  showView (name) {
    this.props.showView(name)
    this.closeListDialog()
  }

  handleFilterChange (filterName) {
    return (filterValue) => this.props.changeFilter(filterName, filterValue)
  }

  render () {
    const { filters, views, defaultView, selectedView } = this.props
    const viewName = selectedView || defaultView || 'Generic view'

    // TODO: The check for filters length is a temporal solution until we have the final Tableau dashboards setup
    return filters.length > 0 && <Card style={dashboardFiltersStyle}>
      <CardHeader style={headerStyle}>
        <Toolbar style={headerToolbarStyle}>
          <ToolbarGroup style={headerToolbarGroupStyle}>
            <FlatButton
              label='My Views'
              icon={<FontIcon className='icon-bullet_list' style={{fontSize: '18px', top: '3px'}} />}
              onTouchTap={this.openListDialog}
              style={buttonStyle}
              />
            <ToolbarSeparator style={headerToolbarSeparatorStyle} />
            <ToolbarTitle text={viewName} style={selectedViewTitle} />
          </ToolbarGroup>
        </Toolbar>
      </CardHeader>
      <CardText style={{padding: '30px'}}>
        {filters.map(({ name, allowedValues, selectedValue }) => (
          <FilterPreview
            key={name}
            name={name}
            allowedValues={allowedValues}
            selectedValues={Array.isArray(selectedValue) ? selectedValue : [selectedValue]}
            onEdit={this.handleFilterChange(name)}
            />
        ))}
      </CardText>
      <CardActions style={footerStyle}>
        <Toolbar style={footerToolbarStyle}>
          <ToolbarGroup />{/* This one is needed to force the next one to be right aligned */}
          <ToolbarGroup lastChild={true} style={footerToolbarGroupStyle}>
            <ToolbarSeparator style={footerToolbarSeparatorStyle} />
            <FlatButton
              label='Save as new'
              icon={<FontIcon className='icon-bullet_list_add' style={{fontSize: '23px', top: '6px'}} />}
              onTouchTap={this.openEditDialog}
              primary={true}
              style={buttonStyle}
              />
          </ToolbarGroup>
        </Toolbar>

      </CardActions>
      <CustomViewsListDialog
        views={views}
        defaultView={defaultView}
        selectedView={selectedView}
        open={this.state.listOpen}
        onCancel={this.closeListDialog}
        onShow={this.showView}
        onSetDefault={this.setDefaultView}
        onRemove={this.removeView}
        />
      <CustomViewDialog
        open={this.state.editOpen}
        onApply={this.saveView}
        onCancel={this.closeEditDialog}
        />
    </Card>
  }
}

DashboardFilters.propTypes = {
  filters: PropTypes.array.isRequired,
  views: PropTypes.array.isRequired,
  defaultView: PropTypes.string,
  selectedView: PropTypes.string,
  // Actions
  changeFilter: PropTypes.func.isRequired,
  removeView: PropTypes.func.isRequired,
  saveView: PropTypes.func.isRequired,
  setDefaultView: PropTypes.func.isRequired,
  showView: PropTypes.func.isRequired,
}

export default DashboardFilters
