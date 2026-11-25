import styles from './NumberInput.module.css'
import type { ComponentProps } from 'react'

interface NumberInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  id: string,
  name: string,
}

const NumberInput = ({id, name, ...rest}: NumberInputProps) => {
  return (
    <input type='number'
          id={id} 
          name={name}
          className={`${styles.numberInput}`}
          {...rest}/>
  )
}

export default NumberInput