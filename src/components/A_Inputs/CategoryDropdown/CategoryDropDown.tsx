import styles from './CategoryDropDown.module.css'

interface CategoryDropDownProps {
    id: string,
    required?: boolean
}

const CategoryDropdown = ({id, required = true}: CategoryDropDownProps) => {
  return (
    <select className={styles.categoryDropdown} id={id} name="category" required={required}>
        <option value="activity">Activity</option>
        <option value="food">Food</option>
        <option value="exploring">Exploring</option>
        <option value="shopping">Shopping</option>
        <option value="travel">Travel</option>
    </select>
  )
}

export default CategoryDropdown