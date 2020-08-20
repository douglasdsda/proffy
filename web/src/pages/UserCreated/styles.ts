import styled from "styled-components";

import concluido from "../../assets/images-v2/concluido.png";

export const Container = styled.div`
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const ContainerCreated = styled.div`
  flex: 1;
  background: url(${concluido}) no-repeat center;
  background-size: cover;
  flex-direction: column;
  color: var(--color-box-base);
  height: 70vh;
  width: 40vh;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 2rem;
    text-align: center;
    color: var(--color-text-complement) !important;
    font-size: 1.6rem;
  }

  button {
    background-color: var(--color-secundary);
    border: 0;
    border-radius: 4px;
    padding: 6px 14px;
    color: var(--color-box-base);
    cursor: pointer;
    margin-top: 4rem;
    font-size: 1.3rem;
    transition: background-color 0.2s;


    &:hover {
      background-color: var(--color-secundary-dark);
    }
  }
`;

export const Title = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-weight: 700;
  font-size: 4rem;
  margin-top: 2rem;
  text-align: center;
  color: var(--color-button-text);
`;
