import styles from './PageButton.module.css'
import type { MouseEventHandler, ButtonHTMLAttributes, ComponentProps } from 'react'

interface PageButtonProps extends Omit<ComponentProps<"button">, "type"> {
  name: string;
  intent?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const PageButton = ({name, 
                     type = "button",
                     intent,
                    ...rest}: PageButtonProps) => {
  return (
    <button className={styles.pageButton} 
            type={type}
            name={intent ? "intent" : undefined} 
            value={intent}
            {...rest}>
        {name}
    </button>
  )
}

export default PageButton