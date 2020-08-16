import React, { FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import background from "../../assets/images-v2/Proffy.png";
import voltar from "../../assets/images-v2/Voltar.png";

import InputUser from "../../components/InputUser";

import "./styles.css";

const Forgot: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSignin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      console.log({
        email,
      });
    },
    [email]
  );

  return (
    <div id="page-forgot">
      <div className="container" id="page-forgot-content">
        <div className="form-content">

         <Link to="/" >
         <img className="back" src={voltar} alt="voltar"/>
         </Link>

          <form onSubmit={handleSignin}>
            <h1>Eita esqueceu sua senha?</h1>
            <h2>não esquenta vamos dar um jeito nisso.</h2>
            {/* <InputUser
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="name"
              placeholder="E-mail"
            /> */}

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
