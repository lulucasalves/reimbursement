import styled from "styled-components";
import { InterfaceContainerSideMenu } from "./interfaces";

export const ContainerMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  background-color: var(--background);
  border-bottom: 1px solid var(--gray2);
  z-index: 100;
  position: relative;
  margin-bottom: -73px;

  .group-items {
    gap: 2rem;
    display: flex;
    align-items: center;
  }

  .group-icons {
    gap: 0.5rem;
    display: flex;
    align-items: center;
  }

  .item4 {
    display: none;
  }

  @media (max-width: 800px) {
    .item4 {
      display: block;
    }

    .item1,
    .item2 {
      display: none;
    }

    padding: 0.5rem 20px;

    .group-items {
      gap: 0.5rem;
    }
  }
`;

export const ContainerImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  object-position: center;
  position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-position: center;
  }
`;

export const ContainerSideMenu = styled.div<InterfaceContainerSideMenu>`
  width: ${({ type }) => {
    if (type === "hide") {
      return "0";
    } else if (type === "expanded") {
      return "250px";
    } else {
      return "60px";
    }
  }};
  border-right: 1px solid var(--gray2);
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease-in-out;
  z-index: 99;
  background: var(--background);

  @media (max-width: 800px) {
    position: absolute;
    top: 73px;

    .iconExpanded {
      display: none;
    }
  }
`;
export const HamburgerMenu = styled.label`
  display: flex;
  flex-direction: column;
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: relative;
  z-index: 10;

  span {
    background: #fff;
    border-radius: 10px;
    height: 2px; /* Ajusta a altura das linhas */
    margin: 3px 0; /* Ajusta o espaçamento entre as linhas */
    transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }

  span:nth-of-type(1) {
    width: 50%; /* Ajusta a largura para 50% do total */
  }

  span:nth-of-type(2) {
    width: 100%;
  }

  span:nth-of-type(3) {
    width: 75%;
  }

  input {
    display: none;
  }

  input:checked ~ span:nth-of-type(1) {
    transform-origin: bottom;
    transform: rotateZ(45deg) translate(4px, 0px); /* Ajusta a movimentação */
  }

  input:checked ~ span:nth-of-type(2) {
    transform-origin: top;
    transform: rotateZ(-45deg);
  }

  input:checked ~ span:nth-of-type(3) {
    transform-origin: bottom;
    width: 57%;
    transform: translate(10px, -5px) rotateZ(45deg); /* Ajusta a movimentação */
  }
`;

export const Container = styled.div`
  position: relative;

  .content-menu {
    display: flex;

    .content {
      width: 100%;
      margin: 20px;
      margin-top: 87px;
    }
  }
`;
