import React, { FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
 
import background from "../../assets/images-v2/Proffy.png";

import InputUser from "../../components/InputUser";

import "./styles.css";

const Signin: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      console.log({
        name,
        password,
      });
    },
    [name, password]
  );

  return (
    <div id="page-signin">
      <div className="container" id="page-signin-content">
        <div className="background-container">
          <img src={background} alt="logo"/>
        </div>

        <div className="form-content">
          <form onSubmit={handleSignin}>
            <h1>Fazer login</h1>
            <InputUser
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Nome"
            />
            <InputUser
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              typePassword
              placeholder="Senha"
            />

            <div className="form-option-content">
              <span className="form-option-save">
                <input type="checkbox" name="save" id="save" />
                <label htmlFor="save">Lembrar-me</label>
              </span>

              <span>Esqueci minha senha</span>
            </div>

            <button name="submit" type="submit">
              Entrar
            </button>

            <div className="form-footer">
              <div className="form-footer-register">
                <span>Não tem conta?</span>
                <Link to="/">Cadastre-se</Link>
              </div>
              <span>É de graça</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
