import React, { FormEvent, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import background from "../../assets/images-v2/Proffy.png";
import voltar from "../../assets/images-v2/Voltar.png";

import InputUser from "../../components/InputUser";

import "./styles.css";
import { FormFields } from "../../utils/FormField";
import api from "../../services/api";

const inputsFields = {
  password: {
    value: "",
    validation: /^(?=.*\d).{6,30}$/,
    valid: false,
    touched: false,
  },
};

const Reset: React.FC = () => {
  const [fields, setFields] = useState<FormFields>(inputsFields as FormFields);
  const [formValid, setFormValid] = useState(false);
  const location = useLocation();
  
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // const token = params.resetPasswordToken;

        // if (!token) {
        //   throw new Error();
        // }

        // console.log('token', token)


      console.log()
    },
    []
  );

  function onInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputIdentifier = e.target.id;
    const newInputValue = e.target.value;

    const allFields = Object.keys(fields);

    let isFormValid = true;
    const isInputValid = fields[inputIdentifier].validation.test(newInputValue);

    if (isInputValid) {
      allFields.forEach((field) => {
        if (isFormValid)
          if (field !== inputIdentifier)
            isFormValid = fields[field].validation.test(fields[field].value);
      });
    } else isFormValid = false;

    if (isFormValid !== formValid) setFormValid(isFormValid);

    setFields({
      ...fields,
      [inputIdentifier]: {
        ...fields[inputIdentifier],
        value: newInputValue,
        touched: true,
        valid: isInputValid,
      },
    });
  }

  function setInputClasses(inputIdentifier: string) {
    return [
      "",
      !fields[inputIdentifier].valid && fields[inputIdentifier].touched
        ? "invalid"
        : "",
    ].join("");
  }

  return (
    <div id="page-forgot">
      <div className="container" id="page-forgot-content">
        <div className="form-content">
          <Link to="/">
            <img className="back" src={voltar} alt="voltar" />
          </Link>

          <form onSubmit={handleSubmit}>
            <h1>Reset</h1>
            <h2>Reset seu password.</h2>
            <InputUser
              classStyles={setInputClasses("password")}
              value={fields.password.value}
              onChange={onInputValueChange}
              maxLength={80}
              name="password"
              typePassword
              placeholder="Password"
              label="Password"
            />

            <button name="submit" type="submit">
              Resetar
            </button>
          </form>
        </div>

        <div className="background-container">
          <img src={background} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Reset;
