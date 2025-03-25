import { styled } from "@mui/material/styles";
import styledComponents from "styled-components";
import { InterfaceContentContainer } from "../Settings/interfaces";

export const Container = styled("div")({
  height: "100%",
  overflowX: "auto",
  display: "flex",
  flexDirection: "column",
});

export const ButtonGroup = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  width: "fit-content",
});

export const GroupButtonsSave = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  width: "100%",
  marginBottom: "1rem",
  justifyContent: "space-between",
});

export const TitleClose = styledComponents.div`
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

export const ContentContainer = styledComponents.div<InterfaceContentContainer>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-height: ${({ fullscreen }) =>
    fullscreen === "1" ? "calc(100vh - 60px)" : "0"};
  height: 100%;
  border-left: 1px solid var(--gray2);

  @media (max-width: 768px) {
    flex-direction: column;

    border-left: none;

    min-height: ${({ fullscreen }) =>
      fullscreen === "1" ? "calc(100vh - 60px)" : "auto"};
  }
`;

export const GroupButtons = styledComponents.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;
