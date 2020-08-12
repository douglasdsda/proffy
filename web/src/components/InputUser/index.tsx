import React, { InputHTMLAttributes, useCallback, useState } from "react";

import iconPassword from "../../assets/images-v2/password.svg";
import "./styles.css";

interface InputUserProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  typePassword?: boolean;
}

const InputUser: React.FC<InputUserProps> = ({
  typePassword,
  name,
  ...rest
}) => {

  const [type, setType] = useState(typePassword)

   const handleAlterType = useCallback(()=> {
    setType(oldType => !oldType);
   },[setType]);

  return (
    <span className="input-user">
      <input type={type ? "password" : "text"} id={name} {...rest} />
      {typePassword && (
        <img onClick={handleAlterType} src={iconPassword} className="input-icon" alt="icon" />
      )}
    </span>
  );
};

export default InputUser;
