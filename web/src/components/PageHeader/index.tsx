/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";
import emoji from "../../assets/images-v2/Emoji.svg";

import "./styles.css";

interface PageHeaderProps {
  title: string;
  description?: string;
  avatar?: string;
  path?: string;
  iconHeader?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header  className="page-header">
      <div className="top-bar-container">
        <Link to="/Landing">
          <img src={backIcon} alt="Voltar" />
        </Link>
        
        {props.path && <span> {props.path} </span>}
        <img src={logoImg} alt="Proff" />
      </div>

      <div className="header-content"> 
        {props?.avatar && <img src={props?.avatar} />}
        <strong>{props.title}</strong>

        <div className="header-content-sub">
          {props.description && <span>{props.description}</span>}
          {props.iconHeader && (
            <div className="header-icon">
              <img className="emoji" src={emoji} alt="Emoji" />
              <span>
                Prepare-se!<span>vai ser o máximo.</span>
              </span>
            </div>
          )}
        </div>
        {props.children}
      </div>
    </header>
  );
};

export default PageHeader;
