import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-x: hidden;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

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

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
`;

export const GroupButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 2rem;
`;
