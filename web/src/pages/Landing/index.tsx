import React, { useEffect, useState, useCallback } from "react";
import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import sair from "../../assets/images-v2/Sair.svg";
 

import { Link, useHistory } from "react-router-dom";

import "./styles.css";
import api from "../../services/api";
import { useAuth } from "../../hooks/auth";

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);
  const { user, signOut } = useAuth();
   const history = useHistory();
  
  useEffect(() => {
    api.get("connections").then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  const handleProfile = useCallback(() => {
    history.push('/Profile');
  }, [history])

  return (
    <div id="page-landing">
      <div className="container" id="page-landing-content">
        <div className="container-title">
          <div className="landing-content-profile">
            <div className="landing-profile">
              <img onClick={handleProfile}  src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
            </div>
            <img onClick={signOut} src={sair} alt="Sair"/>
          </div>

          <div className="main-title">
            <div className="logo-container">
              <img src={logoImg} alt="Proffy" />
              <h2>Sua plataforma de estudos online.</h2>
            </div>
            <img
              src={landingImg}
              className="hero-image"
              alt="Plataforma de estudos"
            />
          </div>
        </div>
        <div className="footer-class">
          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Estudar" />
              Dar aulas
            </Link>
          </div>

          <span className="total-connections">
            Total de {totalConnections} conexões já realizadas
            <img src={purpleHeartIcon} alt="Coração roxo" />
          </span>
          <span className="sub-title">
            <p>Seja bem-vindo.</p>
            <strong>O que deseja fazer?</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Landing;
