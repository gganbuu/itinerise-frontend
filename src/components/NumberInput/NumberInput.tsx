import styles from './NumberInput.module.css'
import type { ChangeEventHandler } from 'react'

interface NumberInputProps {
    id: string
    placeholder?: string,
    name: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    required?: boolean;
    step?: string;
}

const NumberInput = ({id, name, placeholder, onChange, required = true, step = '1'}: NumberInputProps) => {
  return (
    <input type='number'
           id={id} 
           name={name} 
           placeholder={placeholder} 
           onChange={onChange}
           className={styles.numberInput}
           required={required}
           step={step}/>
  )
}

export default NumberInput