import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const ContentOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 55%;
  padding: 1rem 2rem;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ContentSide = styled.div`
  width: 55%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;
  overflow-x: hidden;

  .content {
    text-align: center;
    max-width: 30rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 3rem;
    }

    h3 {
      font-size: 1.8rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }

    h4 {
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ImageSide = styled.div`
  width: 45%;
  display: flex;
  height: 100%;
  background: url(/auth-cover.jpg);
  background-size: cover;
  background-position: center;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const EmailGroupButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;
