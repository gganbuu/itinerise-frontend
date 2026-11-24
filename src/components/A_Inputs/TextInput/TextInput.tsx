import type { ComponentProps } from 'react'
import styles from './TextInput.module.css'

interface TextInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  id: string,
  name: string
}

const TextInput = ({className, ...rest}: TextInputProps) => {
  return (
    <input
          type="text"
          className={`${styles.textInput} ${className ?? ''}`}
          {...rest}
        />
  )
}

export default TextInput