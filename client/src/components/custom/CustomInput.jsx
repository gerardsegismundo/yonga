import React, { useState } from 'react'

const CustomInput = ({ type, name, value = '', onChange, error, label, required, disabled = false }) => {
  const [inputIsActive, setInputIsActive] = useState(false)

  const labelClass = value.length > 0 ? 'valid' : ''
  label = label || name

  const isValid = error.length < 1

  return (
    <div
      className='custom-input-group'
      data-is-active={inputIsActive || value.length > 0}
      data-disabled={disabled}
      data-is-valid={isValid}
    >
      <input
        type={type || 'text'}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        required={required === false ? false : true}
        onBlur={() => setInputIsActive(false)}
        onFocus={() => setInputIsActive(true)}
        disabled={disabled}
        data-is-valid={isValid}
      />

      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {error && <span className='invalid-msg'>{error}</span>}
    </div>
  )
}

export default CustomInput
