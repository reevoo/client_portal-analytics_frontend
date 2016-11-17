import React, { Component, PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import CustomViewsListDialog from '../dialogs/custom_views_list_dialog/custom_views_list_dialog'
import FilterPreview from '../filter_preview/filter_preview'
import TableauLoader from '../tableau_loader/tableau_loader'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss'

import './dashboard_filters.scss'

const buttonStyle = { fontSize: '13px', margin: 0 }

const dashboardFiltersStyles = {
  wrapper: { marginBottom: '30px' },
  header: {
    borderBottom: `1px solid ${colours.whiteFour}`,
    padding: 0,
  },
  headerToolbar: { backgroundColor: 'transparent', height: '78px', marginRight: '8px' },
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
  footerToolbar: { backgroundColor: 'transparent', height: '68px', marginRight: '8px' },
  footerToolbarGroup: { alignItems: 'center' },
  footerToolbarSeparator: {
    backgroundColor: colours.whiteFour,
    height: '100%',
    marginLeft: '15px',
    marginRight: '18px',
    top: 0,
  },
  button: buttonStyle,
  buttonToggle: { ...buttonStyle, width: '150px' },
  selectedViewTitle: {
    color: colours.reevooOrange,
    fontSize: '22px',
    lineHeight: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}

const dummyFunction = () => {}

class DashboardFilters extends Component {
  constructor () {
    super()

    this.handleExpandChange = this.handleExpandChange.bind(this)
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
      expanded: false,
    }
  }

  handleExpandChange (expanded) {
    this.setState({expanded: expanded})
  }

  closeListDialog () {
    this.setState({ listOpen: false })
  }

  openListDialog (addNewItem = false) {
    return (event) => {
      event.stopPropagation()
      this.setState({ listOpen: true, addNewItem })
    }
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
    const { filters, views, defaultView, selectedView, loading } = this.props
    const { expanded } = this.state
    const viewName = selectedView || defaultView || 'Generic view'

    // TODO: The check for filters length is a temporal solution until we have the final Tableau dashboards setup
    return filters.length > 0 && (
      <Card expanded={expanded} onExpandChange={this.handleExpandChange} className='dashboard-filters' style={dashboardFiltersStyles.wrapper}>
        {loading && <div className='dashboard-filters__overlay'><TableauLoader /></div>}
        <CardHeader actAsExpander={true} style={dashboardFiltersStyles.header}>
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
            <ToolbarGroup lastChild={true} style={dashboardFiltersStyles.footerToolbarGroup}>
              <ToolbarSeparator style={dashboardFiltersStyles.footerToolbarSeparator} />
              <FlatButton
                label={expanded ? 'Hide filters' : 'Show filters'}
                icon={<FontIcon className={expanded ? 'icon-arrow_up' : 'icon-arrow_down'} style={{fontSize: '16px', top: '2px'}} />}
                onTouchTap={dummyFunction}
                primary={true}
                style={dashboardFiltersStyles.buttonToggle}
                />
            </ToolbarGroup>
          </Toolbar>
        </CardHeader>
        <CardText expandable={true} style={{padding: '30px'}}>
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
        <CardActions expandable={true} style={dashboardFiltersStyles.footer}>
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
    )
  }
}

DashboardFilters.propTypes = {
  filters: PropTypes.array.isRequired,
  views: PropTypes.array.isRequired,
  defaultView: PropTypes.string,
  selectedView: PropTypes.string,
  loading: PropTypes.bool,
  // Actions
  changeFilter: PropTypes.func.isRequired,
  removeView: PropTypes.func.isRequired,
  saveView: PropTypes.func.isRequired,
  setDefaultView: PropTypes.func.isRequired,
  showView: PropTypes.func.isRequired,
}

export default DashboardFilters
