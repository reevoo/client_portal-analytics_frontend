import React, { Component, PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import './custom_views_list.scss'
import styleValues from '!!sass-variable-loader!./custom_views_list.scss'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss'

const customViewListItemStyles = {
  wrapper: {
    backgroundColor: colours.whiteThree,
    border: '1px solid #ebebeb',
    height: styleValues.viewListItemHeight,
    marginBottom: styleValues.viewListItemMarginBottom,
    padding: '0 20px 0 16px',
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
  separator: {
    height: 'auto',
    marginBottom: '9px',
    marginTop: '9px',
    top: 0,
  },
  favouriteIcon: {
    button: {
      margin: '0 0px 0 -10px',
      padding: 0,
    },
    icon: {
      fontSize: '20px',
    },
  },
  deleteIcon: {
    button: {
      margin: '0 -20px 0 0',
      padding: 0,
    },
    icon: {
      fontSize: '18px',
    },
  },
  saveIcon: {
    button: {
      margin: '0 -20px 0 0',
      padding: 0,
    },
    icon: {
      fontSize: '24px',
    },
  },
  viewIcon: {
    button: {
      margin: '0 -20px 0 0',
      padding: 0,
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
      { // If the view is selected we don't want to display the view button
      !selected && <IconButton
        onClick={onShow}
        style={customViewListItemStyles.viewIcon.button}
        iconStyle={customViewListItemStyles.viewIcon.icon}
        tooltip='Load view'
        >
        <FontIcon className='icon-eye' color={colours.brownishGrey} hoverColor={colours.reevooBlue} />
      </IconButton>
      }
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
    this.save = this.save.bind(this)

    this.state = { newViewName: '' }
  }

  handleNewViewNameChange (event) {
    this.setState({ newViewName: event.target.value })
  }

  handleNewViewEnter (event) {
    if (event.key.toLowerCase() === 'enter') {
      this.save()
    }
  }

  save () {
    const value = this.state.newViewName
    if (value) {
      this.props.onSave(value)
    }
  }

  render () {
    const underlineStyle = {borderBottom: 'none'}

    return (
      <Toolbar style={customViewListItemStyles.wrapper}>
        <ToolbarGroup>
          <TextField
            ref={focusInputField}
            hintText='Enter view name'
            value={this.state.newViewName}
            style={{alignSelf: 'center', height: 'auto'}}
            hintStyle={{bottom: null, fontSize: '14px', fontWeight: 600}}
            inputStyle={{color: colours.black, height: 'auto', fontSize: '14px', fontWeight: 600}}
            underlineStyle={underlineStyle}
            underlineDisabledStyle={underlineStyle}
            underlineFocusStyle={underlineStyle}
            onChange={this.handleNewViewNameChange}
            onKeyDown={this.handleNewViewEnter}
            />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator style={customViewListItemStyles.separator} />
          <IconButton
            onClick={this.save}
            style={customViewListItemStyles.saveIcon.button}
            iconStyle={customViewListItemStyles.saveIcon.icon}
            tooltip='Save view'
            >
            <FontIcon className='icon-plus' color={colours.brownishGrey} hoverColor={colours.reevooBlue} />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

EditableCustomViewListItem.propTypes = {
  onSave: PropTypes.func.isRequired,
}

const PlainCustomViewListItem = ({ text }) => (
  <Toolbar style={customViewListItemStyles.wrapper}>
    <ToolbarGroup>
      <ToolbarTitle text={text} style={customViewListItemStyles.title} />
    </ToolbarGroup>
  </Toolbar>
)

PlainCustomViewListItem.propTypes = {
  text: PropTypes.string.isRequired,
}

export { CustomViewListItem, EditableCustomViewListItem, PlainCustomViewListItem }
