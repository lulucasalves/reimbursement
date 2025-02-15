import styled from "styled-components";

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
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 1rem;
  min-height: 100%;
  height: 100%;
`;

export const Content = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

export const SideMenu = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid var(--gray2);
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
