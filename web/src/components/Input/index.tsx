import React, { InputHTMLAttributes, useCallback } from "react";

import "./styles.css";
import { phoneMask } from "../Mask";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  description?: string;
  col?: string;
  mask?: "currency" | "phone" | "time";
 
}

const Input: React.FC<InputProps> = ({
  label,
  prefix,
  name,
  description,
  mask,
  col,
  ...rest
}) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask) {
        if (mask === "phone") {
          phoneMask(e);
        }
      }
    },
    [mask]
  );

  return (
    <div className={col ? `input-block ${col}` : "input-block"}>
      <div className="label-description">
        <label htmlFor={name}>{label}</label>
        <span>{description && description}</span>
      </div>
   
     
        <input onKeyUp={handleKeyUp} type="text" id={name} {...rest} />
   
    </div>
  );
};

export default Input;
