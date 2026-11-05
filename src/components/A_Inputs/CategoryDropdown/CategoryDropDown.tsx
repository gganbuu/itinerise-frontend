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
        <option value="sightSeeing">Sight-Seeing</option>
        <option value="shopping">Shopping</option>
        <option value="travel">Travel</option>
        <option value="other">Other</option>
    </select>
  )
}

export default CategoryDropdown