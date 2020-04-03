import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'

export function MaskedPhoneInput(props) {
  const { inputRef, value, ...other } = props
  return (
    <MaskedInput
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      value={value}
      placeholder="XXX-XXX-XXXX"
      guide={false}
      {...other}
    />
  )
}

MaskedPhoneInput.propTypes = {
  inputRef: PropTypes.any.isRequired,
}
