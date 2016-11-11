import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {
  ClientPortalDialog, ClientPortalDialogSection, ClientPortalDialogSectionTitle,
} from '../../client_portal_dialog/client_portal_dialog'
import { CustomViewListItem, EditableCustomViewListItem, PlainCustomViewListItem } from './custom_views_list_item'

import './custom_views_list.scss'
import styleValues from '!!sass-variable-loader!./custom_views_list.scss'

class CustomViewsListDialog extends Component {
  constructor (props) {
    super(props)

    this.handleSetDefault = this.handleSetDefault.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleRemove = this.handleRemove.bind(this)

    // showAddNew is a helper to show/remove/animate the add new view text box
    this.state = { showAddNew: props.addNew }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.views.length > this.props.views.length) {
      this.setState({ showAddNew: false })
    } else if (nextProps.views.length === this.props.views.length) {
      this.setState({ showAddNew: nextProps.addNew })
    }
  }

  handleSetDefault (name) {
    return () => this.props.onSetDefault(name)
  }

  handleShow (name) {
    return () => this.props.onShow(name)
  }

  handleRemove (name) {
    return () => this.props.onRemove(name)
  }

  render () {
    const { open, views, defaultView, selectedView, onCancel, onSave } = this.props
    const { showAddNew } = this.state

    const currentView = views.find((view) => view === selectedView)

    return (
      <ClientPortalDialog open={open} title='My views' onCancel={onCancel}>
        <ReactCSSTransitionGroup
          transitionName='scroll_out'
          transitionEnterTimeout={parseInt(styleValues.scrollOutLeaveTime, 10)}
          transitionLeaveTimeout={parseInt(styleValues.scrollOutLeaveTime, 10)}>
          {showAddNew && (
            <ClientPortalDialogSection>
              <ClientPortalDialogSectionTitle title='Save new view' />
              <EditableCustomViewListItem onSave={onSave} />
            </ClientPortalDialogSection>
          )}
        </ReactCSSTransitionGroup>
        <ClientPortalDialogSection>
          <ClientPortalDialogSectionTitle title='Current view' />
          {currentView
            ? <CustomViewListItem
              key={currentView}
              name={currentView}
              selected={true}
              isDefault={currentView === defaultView}
              onRemove={this.handleRemove(currentView)}
              onSetDefault={this.handleSetDefault(currentView)}
              onShow={this.handleShow(currentView)}
              />
            : <PlainCustomViewListItem text='Default view' />
          }
        </ClientPortalDialogSection>
        <ClientPortalDialogSection last={true}>
          <ClientPortalDialogSectionTitle title='Manage your views' />
          <ReactCSSTransitionGroup
            transitionName='view_list'
            transitionEnterTimeout={parseInt(styleValues.viewListEnterTime, 10)}
            transitionLeaveTimeout={parseInt(styleValues.viewListLeaveTime, 10)}>
            {views.length > 0
              ? views.sort().map((view) =>
                <CustomViewListItem
                  key={view}
                  name={view}
                  selected={view === selectedView}
                  isDefault={view === defaultView}
                  onRemove={this.handleRemove(view)}
                  onSetDefault={this.handleSetDefault(view)}
                  onShow={this.handleShow(view)}
                  />
                )
              : <div style={{fontSize: '14px'}}>No saved views</div>
            }
          </ReactCSSTransitionGroup>
        </ClientPortalDialogSection>
      </ClientPortalDialog>
    )
  }
}

CustomViewsListDialog.propTypes = {
  defaultView: PropTypes.string,
  selectedView: PropTypes.string,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool,
  addNew: PropTypes.bool,
  // Actions
  onCancel: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
}

export default CustomViewsListDialog
