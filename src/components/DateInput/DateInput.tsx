import type { ChangeEventHandler } from 'react';

interface DateInputProps {
  id: string,
  name: string,
  required?: boolean,
  min?: string,
  onChange?: ChangeEventHandler<HTMLInputElement>;
}


const DateInput = ({id, name, required, min = "", onChange}: DateInputProps ) => {
  return (
    <input id={id}
           type="date"
           name={name}
           required={required}
           onChange={onChange}
           min={min}/>
  )
}

export default DateInput