import React, { FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import background from "../../assets/images-v2/Proffy.png";
import voltar from "../../assets/images-v2/Voltar.png";

import InputUser from "../../components/InputUser";

import "./styles.css";
import { FormFields } from "../../utils/FormField";

const inputsFields = {
  email: {
    value: "",
    validation: /^[a-z-_\d.]{3,}@[a-z]{3,}(\.com|\.br|\.com\.br)$/i,
    valid: false,

    touched: false,
  },
  password: {
    value: "",
    validation: /^(?=.*\d).{6,30}$/,
    valid: false,
    touched: false,
  },
};

const Forgot: React.FC = () => {
  const [fields, setFields] = useState<FormFields>(inputsFields as FormFields);
  const [formValid, setFormValid] = useState(false);

  const handleSignin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      console.log({
        fields,
      });
    },
    [fields]
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

          <form onSubmit={handleSignin}>
            <h1>Eita esqueceu sua senha?</h1>
            <h2>não esquenta vamos dar um jeito nisso.</h2>
            <InputUser
              classStyles={setInputClasses("email")}
              value={fields.email.value}
              onChange={onInputValueChange}
              maxLength={80}
              name="email"
              placeholder="E-mail"
              label="E-mail"
            />

            <button name="submit" type="submit">
              Enviar
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

export default Forgot;
