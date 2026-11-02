import styles from './SearchBar.module.css'


const SearchBar = () => {
  return (
    <input className={styles.searchBar}
           type="text"
           placeholder="search trips"
    />
  )
}

export default SearchBar