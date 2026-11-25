import styles from "./TextArea.module.css"
import type { ComponentProps } from "react"

interface TextAreaProps extends ComponentProps<'textarea'> {
    id: string,
    name: string,
}

const TextArea = ({id, name, ...rest}: TextAreaProps) => {
  return (
    <textarea className={styles.textArea} name={name} id={id} {...rest}/>
  )
}

export default TextArea