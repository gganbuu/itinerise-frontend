import type { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import styles from './SecondaryButton.module.css'

interface SecondaryButtonProps {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const SecondaryButton = ({name, onClick, type = "button"}: SecondaryButtonProps) => {
  return (
    <button className={styles.secondaryButton} 
            type={type} 
            onClick={onClick}>
        {name}
    </button>
  )
}

export default SecondaryButton