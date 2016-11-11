import React, { Component, PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import './custom_views_list.scss'
import styleValues from '!!sass-variable-loader!./custom_views_list.scss'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss'

const listItemStyles = {
  wrapper: {
    backgroundColor: colours.whiteThree,
    border: '1px solid #ebebeb',
    height: styleValues.viewListItemHeight,
    marginBottom: styleValues.viewListItemMarginBottom,
    padding: '0 20px 0 16px',
  },
  wrapperSelected: { border: `1px solid ${colours.warmGrey}` },
  leftWrapper: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    minWidth: 0, // Helps with text overflow on flex elements
  },
  title: {
    alignSelf: 'center',
    color: colours.black,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  separator: {
    height: 'auto',
    marginBottom: '9px',
    marginTop: '9px',
    top: 0,
  },
  textField: {
    root: {alignSelf: 'center', height: 'auto', width: '100%'},
    hint: {bottom: null, fontSize: '14px', fontWeight: 600},
    input: {color: colours.black, height: 'auto', fontSize: '14px', fontWeight: 600},
    underlineStyle: { borderBottom: 'none' },
  },
  favouriteIcon: {
    button: { margin: '0 0px 0 -10px', minWidth: '48px', padding: 0 },
    icon: { fontSize: '20px' },
  },
  deleteIcon: {
    button: { margin: '0 -20px 0 0', padding: 0 },
    icon: { fontSize: '18px' },
  },
  saveIcon: {
    button: { margin: '0 -20px 0 0', padding: 0 },
    icon: { fontSize: '24px' },
  },
  viewIcon: {
    button: { margin: '0 -20px 0 0', padding: 0 },
    icon: { fontSize: '24px' },
  },
}

/**
 * Sometimes we need an empty action to pass to some MaterialUI components
 */
const dummyAction = () => {}

const CustomViewListItem = ({ name, isDefault, selected, onRemove, onSetDefault, onShow }) => (
  <Toolbar style={{ ...listItemStyles.wrapper, ...(selected ? listItemStyles.wrapperSelected : {}) }}>
    <ToolbarGroup style={listItemStyles.leftWrapper}>
      <IconButton
        disabled={isDefault}
        onClick={!isDefault ? onSetDefault : dummyAction}
        style={listItemStyles.favouriteIcon.button}
        iconStyle={listItemStyles.favouriteIcon.icon}
        tooltip={isDefault ? 'Default view' : 'Set as default'}
        >
        <FontIcon
          className='icon-favourite'
          color={isDefault ? colours.reevooGreen : colours.warmGrey}
          hoverColor={colours.reevooGreen}
          />
      </IconButton>
      <ToolbarTitle text={name} style={listItemStyles.title} />
    </ToolbarGroup>
    <ToolbarGroup>
      { // If the view is selected we don't want to display the view button
      !selected && <IconButton
        onClick={onShow}
        style={listItemStyles.viewIcon.button}
        iconStyle={listItemStyles.viewIcon.icon}
        tooltip='Load view'
        >
        <FontIcon className='icon-eye' color={colours.brownishGrey} hoverColor={colours.reevooBlue} />
      </IconButton>
      }
      <ToolbarSeparator style={listItemStyles.separator} />
      <IconButton
        onClick={onRemove}
        style={listItemStyles.deleteIcon.button}
        iconStyle={listItemStyles.deleteIcon.icon}
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
    return (
      <Toolbar style={listItemStyles.wrapper}>
        <ToolbarGroup style={{flexGrow: 1}}>
          <TextField
            ref={focusInputField}
            hintText='Enter view name'
            value={this.state.newViewName}
            style={listItemStyles.textField.root}
            hintStyle={listItemStyles.textField.hint}
            inputStyle={listItemStyles.textField.input}
            underlineStyle={listItemStyles.textField.underlineStyle}
            underlineDisabledStyle={listItemStyles.textField.underlineStyle}
            underlineFocusStyle={listItemStyles.textField.underlineStyle}
            onChange={this.handleNewViewNameChange}
            onKeyDown={this.handleNewViewEnter}
            />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator style={listItemStyles.separator} />
          <IconButton
            onClick={this.save}
            style={listItemStyles.saveIcon.button}
            iconStyle={listItemStyles.saveIcon.icon}
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
  <Toolbar style={listItemStyles.wrapper}>
    <ToolbarGroup>
      <ToolbarTitle text={text} style={listItemStyles.title} />
    </ToolbarGroup>
  </Toolbar>
)

PlainCustomViewListItem.propTypes = {
  text: PropTypes.string.isRequired,
}

export { CustomViewListItem, EditableCustomViewListItem, PlainCustomViewListItem }
