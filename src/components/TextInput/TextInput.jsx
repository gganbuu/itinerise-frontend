import React from 'react'
import styles from './TextInput.module.css'

const TextInput = ({id, placeholder, name, onChange, type = "text"}) => {
  return (
    <input type={type}
           id={id} 
           name={name} 
           placeholder={placeholder} 
           onChange={onChange}
           className={styles.textInput}/>
  )
}

export default TextInput