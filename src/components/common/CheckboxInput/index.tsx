
import React from "react";

import styles from "./styles.module.css";

interface CheckboxInputProps {
  id: number;
  name: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode; 
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ id, name, children, onChange, checked = false }) => {
  
  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`checkbox-${id}`}>{children}</label>
    </div>
  );
};

export default CheckboxInput;
