import React, { MouseEventHandler } from 'react'
import styles from './FilterButton.module.css'

interface FilterButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  name: string;
}

const FilterButton = ({onClick, name}: FilterButtonProps) => {
  return (
    <button className={styles.filterButton} onClick={onClick}>
        <p>{name}</p>
    </button>
  )
}

export default FilterButton