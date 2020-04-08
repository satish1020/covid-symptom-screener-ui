import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

const styles = (theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
    alignItems: 'center',
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#6db61e',
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#6db61e',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
    border: '2px solid #6e6e6e',
  },
  track: {
    borderRadius: 13,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: '#8e8e8e',
    opacity: 1,
    height: '80%',
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
})

const CustomSwitch = ({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
}

export default withStyles(styles)(CustomSwitch)

CustomSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
}
