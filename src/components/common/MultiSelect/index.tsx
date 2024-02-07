"use client"
import React, { useState } from "react";
import classNames from "classnames"

import DropdownArrow from "@/assets/svg/dropdown-arrow.svg";

import MultiSelectButton from "./button";

import styles from "./styles.module.css";

interface SelectedDataItem {
  id: number;
  name: string;
  image:string;
  episode:string[]
}

interface MultiSelectProps {
  width?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedData: SelectedDataItem[];
  handleDeleteButton: (selected: SelectedDataItem) => void;
  handleDropdownIconClick?: () => void,
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}


const MultiSelect: React.FC<MultiSelectProps> = ({
  width,
  onChange,
  selectedData,
  handleDeleteButton,
  handleDropdownIconClick,
  onFocus
})  => {
  const [isClickIcon,setIsClickIcon] = useState(false);

  const iconClass = classNames({
    [styles.icon]: true,
    [styles.iconRotate]: isClickIcon,
  });


  const handleClickIcon = () => {
    setIsClickIcon(!isClickIcon);
    handleDropdownIconClick()
  }
  return (
    <div className={styles.wrapper} style={{ width:width }}>
      {selectedData.map(selected =>(
         <MultiSelectButton key={selected.id.toString()} name = {selected.name} handleDeleteButton = {() => handleDeleteButton(selected)} />
      ))}
      <input
        className={styles.inputClass}
        type="text"
        placeholder="Search"
        onChange={(e) => onChange(e)}
        onFocus={onFocus}
      />
      <DropdownArrow onClick={handleClickIcon} className={iconClass} />
    </div>
  );
};

export default MultiSelect;
