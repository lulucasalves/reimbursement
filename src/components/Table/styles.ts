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
});

export const GroupButtonsSave = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  width: "100%",
  marginBottom: "1rem",
  justifyContent: "space-between",
});
