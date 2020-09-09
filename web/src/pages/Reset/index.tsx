import React, { FormEvent, useCallback, useState } from "react";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";

import background from "../../assets/images-v2/Proffy.png";

import InputUser from "../../components/InputUser";

import "./styles.css";
import { FormFields } from "../../utils/FormField";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";

interface PropsToken {
  token: string;
}

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
  const { addToast } = useToast();
  const { search } = useLocation();
  const history = useHistory();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const [_, token] = search.split("=");

      if (token) {
        api
          .post(`reset/${token}`, {
            password: fields.password.value,
          })
          .then((response) => {
            console.log("response: ", response);
            addToast({
              type: "success",
              title: "Resetado com sucesso.",
              description: "Redirecionando para pagina Inicial!",
            });

            history.push("/");
          })
          .catch((err) => {
            addToast({
              type: "error",
              title: "Erro ao tentar mudar o password.",
            });
          });
      } else {
        addToast({
          type: "error",
          title: "Token não existe.",
        });
      }
    },
    [addToast, fields.password.value, history, search]
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
    <div id="page-reset">
      <div className="container" id="page-reset-content">
        <div className="form-content">
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
            <button
              disabled={!fields.password.valid}
              name="submit"
              type="submit"
            >
              Resetar
            </button>
          </form>
        </div>
        <div className="background-container-reset">
          <img src={background} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Reset;
