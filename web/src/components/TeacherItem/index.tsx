import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import "./styles.css";
 

const TeacherItem: React.FC = () => {
  return  (
    <article className="teacher-item">
    <header>
      <img src="https://avatars2.githubusercontent.com/u/39007454?s=460&u=f6b1857527e47f1028c8efe3581af27a1ce2f3ae&v=4" alt="Douglas"/>
      <div>
        <strong>Douglas</strong>
        <span>Ciencia</span>
      </div>
    </header>

      <p>
        Entusiasta das melhores tecnologias de quimica avancado
        <br/><br/>
        Apaixonado por explodir coisas em laboratorio e por mudar a vida das pessoas atraves de experiencias.
      </p>

      <footer>
        <p>
          Preco/Hora
          <strong>R$80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Entrar em contato"/>
          Entrar em contato
        </button>
      </footer>

  </article>
  )
}

export default TeacherItem;