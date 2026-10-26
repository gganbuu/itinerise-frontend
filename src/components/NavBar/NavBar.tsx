import type { ReactNode } from 'react';
import styles from './NavBar.module.css';

interface NavBarProps {
  children: ReactNode;
}


const NavBar = ({children}: NavBarProps) => {
  return (
    <header>
      <nav className={styles.navContainer}>
          {children}
      </nav>
    </header>
  )
}

export default NavBar