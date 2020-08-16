import React, { FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import background from "../../assets/images-v2/Proffy.png";

import InputUser from "../../components/InputUser";
import heart from "../../assets/images/icons/purple-heart.svg";

import { FormFields } from "../../utils/FormField";
import "./styles.css";

const initialFields = {
  email: {
    value: '',
    validation: /^[a-z-_\d.]{3,}@[a-z]{3,}(\.com|\.br|\.com\.br)$/i,
    valid: false,

    touched: false,
  },
  password: {
    value: '',
    validation: /^(?=.*\d).{6,30}$/,
    valid: false,
    touched: false,
  },
};

const Signin: React.FC = () => {
 
  const [fields, setFields] = useState<FormFields>(initialFields as FormFields);
  const [formValid, setFormValid] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSignin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (feedback) setFeedback("");
      console.log({
        fields
      });
    },
    [feedback, fields]
  );

  function onInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputIdentifier = e.target.id;
    const newInputValue = e.target.value;

    const allFields = Object.keys(fields);

    let isFormValid = true;
    const isInputValid = fields[inputIdentifier].validation.test(newInputValue);
    console.log(isInputValid);

    if (isInputValid) {
      allFields.forEach((field) => {
        if (isFormValid)
          if (field !== inputIdentifier)
            isFormValid = fields[field].validation.test(fields[field].value);
      });
    } else isFormValid = false;

    if (isFormValid !== formValid) setFormValid(isFormValid);

    if (feedback) setFeedback("");

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
    <div id="page-signin">
      <div className="container" id="page-signin-content">
        <div className="background-container">
          <img src={background} alt="logo" />
        </div>

        <div className="form-content">
          <form onSubmit={handleSignin}>
            <h1>Fazer login</h1>
            <InputUser
              classStyles={setInputClasses("email")}
              value={fields.email.value}
              onChange={onInputValueChange}
              maxLength={80}
              name="email"
              placeholder="E-mail"
              label="E-mail"
            />
            <InputUser
              classStyles={setInputClasses("password")}
              value={fields.password.value}
              onChange={onInputValueChange}
              maxLength={30}
              name="password"
              id="password"
              typePassword
              placeholder="Senha"
              label="Senha"
            />

            <div className="form-option-content">
              <span className="form-option-save">
                <input type="checkbox" name="save" id="save" />
                <label htmlFor="save">Lembrar-me</label>
              </span>

              <Link to="/Forgot" className="forgot">
                Esqueci minha senha
              </Link>
            </div>

            <button disabled={!formValid} name="submit" type="submit">
              Entrar
            </button>

            <div className="form-footer">
              <div className="form-footer-register">
                <span>Não tem conta?</span>
                <Link to="/">Cadastre-se</Link>
              </div>
              <span>
                É de graça <img src={heart} alt="Heart" />
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
