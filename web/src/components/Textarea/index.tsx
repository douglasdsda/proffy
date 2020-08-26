import React, { TextareaHTMLAttributes } from "react";

import "./styles.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  description?: string;
  col?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  col,
  description,
  ...rest
}) => {
  return (
    
    <div className={ col ? `textarea-block ${col}` : "textarea-block"} >
      <div className="label-description">
        <label htmlFor={name}>{label}</label>
        <span>{description && "(" + description + ")"}</span>
      </div>
      <textarea id={name} {...rest}></textarea>
    </div>
  );
};

export default Textarea;
