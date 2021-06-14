import React, { useState } from 'react'

const CustomTextArea = ({ name, value = '', onChange, disabled, label = '', placeholder = '' }) => {
  const [inputIsActive, setInputIsActive] = useState(false)

  return (
    <div className='custom-text-area'>
      <textarea
        name={name}
        id={name}
        cols='10'
        rows='10'
        value={value}
        onChange={onChange}
        onBlur={() => setInputIsActive(false)}
        onFocus={() => setInputIsActive(true)}
        disabled={disabled}
      ></textarea>

      <label htmlFor={name} className={value.length > 0 ? 'is-active' : ''}>
        {label}
      </label>

      <span className={`placeholder${inputIsActive || value.length > 0 ? ' is-active' : ''}`}>{placeholder}</span>
    </div>
  )
}

export default CustomTextArea
