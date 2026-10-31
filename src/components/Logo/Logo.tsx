import styles from './Logo.module.css'

export const Logo = () => {
  return (
    <div className={styles.logoContainer}>
        <div className={styles.logoBox}/>
        <h2>itinerise</h2>
    </div>
  )
}

