import styles from "./TextArea.module.css"

interface TextAreaProps {
    id: string,
    name: string,
    placeholder: string
}

const TextArea = ({id, name, placeholder}: TextAreaProps) => {
  return (
    <textarea className={styles.textArea} name={name} id={id} placeholder={placeholder}/>
  )
}

export default TextArea