import type { ReactNode } from 'react';
import styles from './FilterBar.module.css'

interface FilterBarProps {
  children: ReactNode;
}

const FilterBar = ({children}: FilterBarProps) => {
  
  return (
    <div className={styles.filterBar}>{children}</div>
  )
}

export default FilterBar