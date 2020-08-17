import React, { FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import background from "../../assets/images-v2/Proffy.png";

import InputUser from "../../components/InputUser";
import voltar from "../../assets/images-v2/Voltar.png";

import { FormFields } from "../../utils/FormField";
import "./styles.css";

const inputsFields = {
  nome: {
    value: "",
    validation: /^(?=.*\d).{2,80}$/,
    valid: false,
    touched: false,
  },
  sobrenome: {
    value: "",
    validation: /^(?=.*\d).{2,80}$/,
    valid: false,
    touched: false,
  },
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

const SignUp: React.FC = () => {
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
    <div id="page-signup">
      <div className="container" id="page-signup-content">
        <div className="background-container">
          <img src={background} alt="logo" />
        </div>

        <div className="form-content">
          <Link to="/" className="voltar">
            <img src={voltar} alt="voltar" />
          </Link>
          <form onSubmit={handleSignin}>
            <h1>Cadastro</h1>
            <h2>Preencha os dados abaixo para começar.</h2>
            <InputUser
              classStyles={setInputClasses("nome")}
              value={fields.nome.value}
              onChange={onInputValueChange}
              maxLength={80}
              name="nome"
              placeholder="Nome"
              label="Nome"
            />
            <InputUser
              classStyles={setInputClasses("sobrenome")}
              value={fields.sobrenome.value}
              onChange={onInputValueChange}
              maxLength={80}
              name="sobrenome"
              placeholder="Sobrenome"
              label="Sobrenome"
            />
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

            <button disabled={!formValid} name="submit" type="submit">
              Concluir cadastro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
