import React from "react";

import { Container, ContainerCreated, Title } from "./styles";
import feito from "../../assets/images-v2/Feito.png";
import { useHistory } from "react-router-dom";

const UserCreated: React.FC = () => {


  const history = useHistory();

  return (
    <Container>
      <ContainerCreated>
        <img src={feito} alt="feito" />
        <Title>Cadastro concluído</Title>
        <p>
          Agora você faz parte da plataforma da Proffy. Tenha uma ótima
          experiência.
        </p>
        <button onClick={()=>{
               history.push("/");
        }} >Fazer login </button>
      </ContainerCreated>
    </Container>
  );
};

export default UserCreated;
