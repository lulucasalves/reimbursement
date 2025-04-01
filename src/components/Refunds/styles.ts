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

export const NoEventContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  h3 {
    font-size: 1.3rem;
    font-weight: 500;
  }
`