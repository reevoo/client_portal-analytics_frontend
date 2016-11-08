import React, { Component, PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import { ClientPortalDialog, ClientPortalDialogSectionTitle } from '../../client_portal_dialog/client_portal_dialog'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss'

const customViewListItemStyles = {
  wrapper: {
    backgroundColor: colours.whiteThree,
    border: '1px solid #ebebeb',
    height: 'auto',
    marginBottom: '15px',
    padding: '10px 20px 10px 16px',
  },
  wrapperSelected: {
    border: `1px solid ${colours.warmGrey}`,
  },
  title: {
    alignSelf: 'center',
    color: colours.black,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  // editableTitle: {
  //   color: colours.black,
  //   fontSize: '14px',
  //   fontWeight: 600,
  //   lineHeight: 1.3,
  // },
  separator: {
    height: 'auto',
    top: 0,
  },
  favouriteIcon: {
    button: {
      height: 'auto',
      margin: '-10px 0px -10px -10px',
    },
    icon: {
      fontSize: '20px',
    },
  },
  deleteIcon: {
    button: {
      height: 'auto',
      margin: '-10px -20px -10px 0',
    },
    icon: {
      fontSize: '18px',
    },
  },
  viewIcon: {
    button: {
      height: 'auto',
      margin: '-10px -20px -10px 0',
    },
    icon: {
      fontSize: '24px',
    },
  },
}

/**
 * We need to override the inline styles because MaterialUI uses them
 * and we can't set them from the CSS
 */
const wrapperStyle = (isSelected) => ({
  ...customViewListItemStyles.wrapper,
  ...(isSelected ? customViewListItemStyles.wrapperSelected : {}),
})

/**
 * Sometimes we need an empty action to pass to some MaterialUI components
 */
const dummyAction = () => {}

const CustomViewListItem = ({ name, isDefault, selected, onRemove, onSetDefault, onShow }) => (
  <Toolbar style={wrapperStyle(selected)}>
    <ToolbarGroup>
      <IconButton
        onClick={!isDefault ? onSetDefault : dummyAction}
        style={customViewListItemStyles.favouriteIcon.button}
        iconStyle={customViewListItemStyles.favouriteIcon.icon}
        tooltip={isDefault ? 'Default view' : 'Set as default'}
        >
        <FontIcon
          className='icon-favourite'
          color={isDefault ? colours.reevooGreen : colours.warmGrey}
          hoverColor={colours.reevooGreen}
          />
      </IconButton>
      <ToolbarTitle text={name} style={customViewListItemStyles.title} />
    </ToolbarGroup>
    <ToolbarGroup>
      <IconButton
        onClick={onShow}
        style={customViewListItemStyles.viewIcon.button}
        iconStyle={customViewListItemStyles.viewIcon.icon}
        tooltip='Load view'
        >
        <FontIcon className='icon-eye' color={colours.brownishGrey} hoverColor={colours.reevooBlue} />
      </IconButton>
      <ToolbarSeparator style={customViewListItemStyles.separator} />
      <IconButton
        onClick={onRemove}
        style={customViewListItemStyles.deleteIcon.button}
        iconStyle={customViewListItemStyles.deleteIcon.icon}
        tooltip='Remove view'
        >
        <FontIcon className='icon-trash_cross' color={colours.brownishGrey} hoverColor={colours.redOrange} />
      </IconButton>
    </ToolbarGroup>
  </Toolbar>
)

CustomViewListItem.propTypes = {
  name: PropTypes.string.isRequired,
  isDefault: PropTypes.bool,
  selected: PropTypes.bool,
  // Actions
  onRemove: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
}

/**
 * Sets the focus on the given input.
 * It needs to check if the input exists to avoid problens on re-render.
 */
const focusInputField = (input) => input && input.focus()

class EditableCustomViewListItem extends Component {
  constructor (props) {
    super(props)

    this.handleNewViewNameChange = this.handleNewViewNameChange.bind(this)
    this.handleNewViewEnter = this.handleNewViewEnter.bind(this)

    this.state = { newViewName: '' }
  }

  handleNewViewNameChange (event) {
    this.setState({ newViewName: event.target.value })
  }

  handleNewViewEnter (event) {
    if (event.key.toLowerCase() === 'enter') {
      const value = event.target.value
      if (value) {
        this.props.onSave(value)
      }
    }
  }

  render () {
    return (
      <Toolbar style={customViewListItemStyles.wrapper}>
        <ToolbarGroup>
          <IconButton
            onClick={dummyAction}
            style={customViewListItemStyles.favouriteIcon.button}
            iconStyle={customViewListItemStyles.favouriteIcon.icon}
            >
            <FontIcon className='icon-favourite' color={colours.warmGrey} hoverColor={colours.warmGrey} />
          </IconButton>
          <TextField
            ref={focusInputField}
            hintText='Type the view name'
            value={this.state.newViewName}
            style={{height: 'auto'}}
            hintStyle={{bottom: null, fontSize: '14px', fontWeight: 600}}
            inputStyle={{color: colours.black, height: 'auto', fontSize: '14px', fontWeight: 600}}
            underlineStyle={{borderBottom: 'none'}}
            underlineFocusStyle={{borderBottom: 'none'}}
            onChange={this.handleNewViewNameChange}
            onKeyDown={this.handleNewViewEnter}
            />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

EditableCustomViewListItem.propTypes = {
  onSave: PropTypes.func.isRequired,
}

class CustomViewsListDialog extends Component {
  constructor (props) {
    super(props)

    this.handleSetDefault = this.handleSetDefault.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
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

    return (
      <ClientPortalDialog open={open} title='Your views' onCancel={onCancel}>
        <ClientPortalDialogSectionTitle title='Manage your views' />
        {views.map((view) =>
          <CustomViewListItem
            key={view}
            name={view}
            selected={view === selectedView}
            isDefault={view === defaultView}
            onRemove={this.handleRemove(view)}
            onSetDefault={this.handleSetDefault(view)}
            onShow={this.handleShow(view)}
            />
        )}
        <EditableCustomViewListItem onSave={onSave} />
      </ClientPortalDialog>
    )
  }
}

CustomViewsListDialog.propTypes = {
  defaultView: PropTypes.string,
  selectedView: PropTypes.string,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool,
  // Actions
  onCancel: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
}

export default CustomViewsListDialog
