import type { MouseEventHandler, ButtonHTMLAttributes} from 'react'
import styles from './FilterButton.module.css'

interface FilterButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  name: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const FilterButton = ({onClick, name, type = "button"}: FilterButtonProps) => {
  return (
    <button className={styles.filterButton} onClick={onClick} type={type}>
        <p>{name}</p>
    </button>
  )
}

export default FilterButton