import React, {
  InputHTMLAttributes,
  useCallback,
  useState,
 
  useMemo,
} from "react";

import iconPassword from "../../assets/images-v2/password.svg";
import iconPasswordAtive from "../../assets/images-v2/ativePassword.png";
import "./styles.css";

interface InputUserProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  typePassword?: boolean;
  classStyles: string;
  label?: string;
}

const InputUser: React.FC<InputUserProps> = ({
  typePassword,
  name,
  label,
  classStyles,
  ...rest
}) => {
  const [type, setType] = useState(typePassword);

  const handleAlterType = useCallback(() => {
    setType((oldType) => !oldType);
  }, [setType]);

  const hasValue = useMemo(() => {
    return !!rest.value;
  }, [rest.value]);

  return (
    <span
      id="input-user"
      className={hasValue && !classStyles ? "fillValue" : classStyles}
    >
      <div className="input-label">
        {label && hasValue && <label htmlFor={name}>{label}</label>}
        <input type={type ? "password" : "text"} id={name} {...rest} />
      </div>
      {typePassword && (
        <img
          onClick={handleAlterType}
          src={type ? iconPassword : iconPasswordAtive}
          className="input-icon"
          alt="icon"
        />
      )}
    </span>
  );
};

export default InputUser;
