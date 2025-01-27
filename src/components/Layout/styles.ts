import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  background-color: var(--background);
  border-bottom: 1px solid var(--gray2);

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
