import React, { Component, PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import CustomViewsListDialog from '../dialogs/custom_views_list_dialog/custom_views_list_dialog'
import FilterPreview from '../filter_preview/filter_preview'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss'

import './dashboard_filters.scss'

const dashboardFiltersStyles = {
  wrapper: { marginBottom: '30px' },
  header: {
    borderBottom: `1px solid ${colours.whiteFour}`,
    padding: 0,
  },
  headerToolbar: { backgroundColor: 'transparent', height: '78px' },
  headerToolbarGroup: {
    alignItems: 'center',
    minWidth: 0, // Helps with text overflow on flex elements
  },
  headerToolbarSeparator: {
    backgroundColor: colours.whiteFour,
    height: '50px',
    marginLeft: '15px',
    marginRight: '25px',
    top: 0,
  },
  footer: {
    borderTop: `1px solid ${colours.whiteFour}`,
    padding: 0,
    textAlign: 'right',
  },
  footerToolbar: { backgroundColor: 'transparent', height: '68px' },
  footerToolbarGroup: { alignItems: 'center' },
  footerToolbarSeparator: {
    backgroundColor: colours.whiteFour,
    height: '100%',
    marginLeft: '15px',
    marginRight: '18px',
    top: 0,
  },
  button: { fontSize: '13px', margin: 0 },
  selectedViewTitle: {
    color: colours.reevooOrange,
    fontSize: '22px',
    lineHeight: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}

class DashboardFilters extends Component {
  constructor () {
    super()

    this.handleFilterChange = this.handleFilterChange.bind(this)

    this.removeView = this.removeView.bind(this)
    this.saveView = this.saveView.bind(this)
    this.setDefaultView = this.setDefaultView.bind(this)
    this.showView = this.showView.bind(this)

    this.closeListDialog = this.closeListDialog.bind(this)
    this.openListDialog = this.openListDialog.bind(this)

    this.state = {
      addNewItem: false,
      listOpen: false,
    }
  }

  closeListDialog () {
    this.setState({ listOpen: false })
  }

  openListDialog (addNewItem = false) {
    return () => this.setState({ listOpen: true, addNewItem })
  }

  removeView (name) {
    this.props.removeView(name)
  }

  saveView (name) {
    this.props.saveView(name)
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
    return filters.length > 0 && <Card style={dashboardFiltersStyles.wrapper}>
      <CardHeader style={dashboardFiltersStyles.header}>
        <Toolbar style={dashboardFiltersStyles.headerToolbar}>
          <ToolbarGroup style={dashboardFiltersStyles.headerToolbarGroup}>
            <FlatButton
              label='My Views'
              icon={<FontIcon className='icon-bullet_list' style={{fontSize: '18px', top: '3px'}} />}
              onTouchTap={this.openListDialog()}
              style={dashboardFiltersStyles.button}
              />
            <ToolbarSeparator style={dashboardFiltersStyles.headerToolbarSeparator} />
            <ToolbarTitle text={viewName} style={dashboardFiltersStyles.selectedViewTitle} />
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
      <CardActions style={dashboardFiltersStyles.footer}>
        <Toolbar style={dashboardFiltersStyles.footerToolbar}>
          <ToolbarGroup />{/* This one is needed to force the next one to be right aligned */}
          <ToolbarGroup lastChild={true} style={dashboardFiltersStyles.footerToolbarGroup}>
            <ToolbarSeparator style={dashboardFiltersStyles.footerToolbarSeparator} />
            <FlatButton
              label='Save as new'
              icon={<FontIcon className='icon-bullet_list_add' style={{fontSize: '23px', top: '6px'}} />}
              onTouchTap={this.openListDialog(true)}
              primary={true}
              style={dashboardFiltersStyles.button}
              />
          </ToolbarGroup>
        </Toolbar>
      </CardActions>
      <CustomViewsListDialog
        views={views}
        defaultView={defaultView}
        selectedView={selectedView}
        open={this.state.listOpen}
        addNew={this.state.addNewItem}
        onCancel={this.closeListDialog}
        onSave={this.saveView}
        onShow={this.showView}
        onSetDefault={this.setDefaultView}
        onRemove={this.removeView}
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
