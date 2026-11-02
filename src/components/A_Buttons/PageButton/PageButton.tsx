import styles from './PageButton.module.css'
import type { MouseEventHandler, ButtonHTMLAttributes } from 'react'

interface PageButtonProps {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  intent?: string;
}

const PageButton = ({name, 
                     onClick,
                     type = "button",
                     intent}: PageButtonProps) => {
  return (
    <button type={type} 
            onClick={onClick} 
            className={styles.pageButton} 
            name={intent ? "intent" : undefined} 
            value={intent}>
        {name}
    </button>
  )
}

export default PageButton