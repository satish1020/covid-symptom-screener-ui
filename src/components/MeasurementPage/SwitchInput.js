import React from 'react'
import PropTypes from 'prop-types'
import { Box, FormLabel, makeStyles } from '@material-ui/core'
import CustomSwitch from './CustomSwitch'

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '1.2rem',
  },
}))

const SwitchInput = ({ label, id, value, onChange }) => {
  const classes = useStyles()
  return (
    <Box
      marginBottom={1.5}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <FormLabel htmlFor={id} className={classes.label}>
        {label}
      </FormLabel>
      <div>
        <CustomSwitch
          id={id}
          checked={value}
          onChange={onChange}
          inputProps={{
            'aria-label': label,
            'data-testid': id,
          }}
        />
        <span data-testid={`${id}-display-value`}>{value ? 'YES' : 'No'}</span>
      </div>
    </Box>
  )
}

export default SwitchInput

SwitchInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}
