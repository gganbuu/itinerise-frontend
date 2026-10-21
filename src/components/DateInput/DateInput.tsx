import React from 'react'

const DateInput = ({id, name, required, min = "", onChange}) => {
  return (
    <input id={id}
           type="date"
           name={name}
           required={required}
           onChange={onChange}
           min={min}/>
  )
}

export default DateInput