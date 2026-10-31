import { useState, type ChangeEventHandler } from 'react';
import styles from './DateInput.module.css'

interface DateInputProps {
  id: string,
  name: string,
  required?: boolean,
  min?: string,
  onChange?: ChangeEventHandler<HTMLInputElement>;
}


const DateInput = ({id, name, required, min = "", onChange}: DateInputProps ) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsEmpty(e.target.value === "");
    onChange?.(e);
  }

  return (
    <input id={id}
           type="date"
           name={name}
           required={required}
           onChange={handleChange}
           className={`${styles.dateInput} ${isEmpty ? styles.empty : ""}`}
           min={min}/>
  )
}

export default DateInput
