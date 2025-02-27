import { styled } from "@mui/material/styles";

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
  marginBottom: "1rem",
});
