import React, { FormEvent, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import background from "../../assets/images-v2/Proffy.png";

import InputUser from "../../components/InputUser";
import voltar from "../../assets/images-v2/Voltar.png";

import { FormFields } from "../../utils/FormField";
import "./styles.css";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  sobrenome: string;
}

const inputsFields = {
  nome: {
    value: "",
    validation: /^.{3,80}$/,
    valid: false,
    touched: false,
  },
  sobrenome: {
    value: "",
    validation: /^.{2,80}$/,
    valid: false,
    touched: false,
  },
  email: {
    value: "",
    validation: /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
    valid: false,
    touched: false,
  },
  password: {
    value: "",
    validation: /^.{6,30}$/,
    valid: false,
    touched: false,
  },
};

const SignUp: React.FC = () => {
  const [fields, setFields] = useState<FormFields>(inputsFields as FormFields);
  const [formValid, setFormValid] = useState(false);

  const history = useHistory();
  const { addToast } = useToast();

  const handleSignUp = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const name = fields.nome.value;
        const email = fields.email.value;
        const password = fields.password.value;
        const sobrenome = fields.sobrenome.value;

        await api.post("/users", {
          name,
          email,
          password,
          sobrenome,
        });

        history.push("/UserCreated");

        addToast({
          type: "success",
          title: "Cadastro realizado!",
          description: "Você já pode fazer seu logon no Proffy!",
        });
      } catch (error) {
        addToast({
          type: "error",
          title: "Erro no cadastro",
        });
      }
    },
    [addToast, fields, history]
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
          <form onSubmit={handleSignUp}>
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
