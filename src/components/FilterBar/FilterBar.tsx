import React from 'react'
import styles from './FilterBar.module.css'

interface FilterBarProps {
  children: React.ReactNode;
}

const FilterBar = ({children}: FilterBarProps) => {
  
  return (
    <div className={styles.filterBar}>{children}</div>
  )
}

export default FilterBar