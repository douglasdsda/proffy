/* eslint-disable jsx-a11y/alt-text */
import React, { ChangeEvent,  useCallback } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";
import emoji from "../../assets/images-v2/Emoji.svg";

import "./styles.css";
import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import { FiCamera } from "react-icons/fi";

interface PageHeaderProps {
  title: string;
  description?: string;
  avatar?: string;
  path?: string;
  iconHeader?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {

  const { addToast } = useToast();
  const { updateUser } = useAuth();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);
        api
          .patch('/users/avatar', data)
          .then(response => {
 
            updateUser(response.data);

            addToast({
              type: 'success',
              title: 'Avatar atualizado!',
            });
          })
          .catch(() => {
            addToast({
              type: 'error',
              title: 'Erro ao atualizar a foto do perfil.',
            });
          });
      }  
    },
    [addToast, updateUser],
  )

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
        {props?.avatar && 
        (
          <div className="change-avatar" >
            <img src={props?.avatar} />
            <label htmlFor="avatar">
            <FiCamera />
            <input
                onChange={handleAvatarChange}
                type="file"
                id="avatar"
                name="avatar"
              />
            </label>
          </div>
        )
        
        }
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
