import styles from './PageButton.module.css'

import React from 'react'

const PageButton = ({name, onClick, type = "button", intent = false, value = false}) => {
  return (
    <button type={type} onClick={onClick} className={styles.pageButton} name={intent ? ("intent") : ""} value={value ? `${value}` : ""}>
        {name}
    </button>
  )
}

export default PageButton