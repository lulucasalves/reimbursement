import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const SelectGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.3rem;
  background-color: var(--background-light);
  padding: 1rem;
  border-radius: 0.5rem;

  h3 {
    font-weight: 500;
    color: var(--gray1);
  }

  p {
    font-size: 2rem;
    font-weight: 400;
  }
`;

export const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: hidden;

  .graph-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
`;

export const GraphItem = styled.div`
  width: 100%;
  height: 100%;
`;
