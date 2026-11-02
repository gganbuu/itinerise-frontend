import type { ChangeEventHandler } from 'react'
import styles from './TextInput.module.css'

interface TextInputProps {
  id: string,
  placeholder?: string,
  name: string,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  required?: boolean;
}

const TextInput = ({id, placeholder, name, onChange, required}: TextInputProps) => {
  return (
    <input type='text'
           id={id} 
           name={name} 
           placeholder={placeholder} 
           onChange={onChange}
           className={styles.textInput}
           required={required}/>
  )
}

export default TextInput