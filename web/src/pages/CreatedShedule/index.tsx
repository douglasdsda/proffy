import React from "react";

import { Container, ContainerCreated, Title } from "./styles";
import feito from "../../assets/images-v2/Feito.png";
import { useHistory } from "react-router-dom";

const CreatedShedule: React.FC = () => {


  const history = useHistory();

  return (
    <Container>
      <ContainerCreated>
        <img src={feito} alt="feito" />
        <Title>Cadastro concluído</Title>
        <p>
        Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.
        </p>
        <button onClick={()=>{
               history.push("/study");
        }} >Acessar</button>
      </ContainerCreated>
    </Container>
  );
};

export default CreatedShedule;
