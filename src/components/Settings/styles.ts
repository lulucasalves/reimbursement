import styled from "styled-components";
import { InterfaceContentContainer } from "./interfaces";

export const TitleClose = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  .title {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .icons-group {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
      gap: 1rem;
    }
  }
`;

export const ContentContainer = styled.div<InterfaceContentContainer>`
  display: flex;
  gap: 1rem;
  min-height: ${({ fullscreen }) =>
    fullscreen === "1" ? "calc(100vh - 60px)" : "20rem"};
  height: 100%;
  border-left: 1px solid var(--gray2);

  @media (max-width: 768px) {
    flex-direction: column;

    border-left: none;

    min-height: ${({ fullscreen }) =>
      fullscreen === "1" ? "calc(100vh - 60px)" : "auto"};
  }
`;

export const Content = styled.div`
  margin-top: 1rem;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-top: 0;
    padding: 1rem;
  }
`;

export const SideMenu = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ItemMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ItemsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ContainerPreferences = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 1rem;
`;
