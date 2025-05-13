import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";

import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import { useStatus } from "~/src/contexts/state";

import { ContentContainer, GroupButtons, TitleClose } from "./styles";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<IoChevronForward />} {...props} />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export function ComponentTableChangesDialog({
  editedItems,
  currentData,
  columns,
  isOpen,
  onClose,
  options = {},
  loading,
  confirmChanges,
}) {
  const { t, formatDate } = useStatus();
  const isMobile = window.innerWidth < 768;
  const [fullscreen, setFullscreen] = useState(false);
  const [expanded, setExpanded] = useState(["create", "edit", "remove"]);

  function handdleFullScreen() {
    setFullscreen(!fullscreen);
  }

  function handleChange(item) {
    if (expanded.includes(item)) {
      setExpanded((prev) => prev.filter((val) => val !== item));
    } else {
      setExpanded((prev) => [...prev, item]);
    }
  }

  function selectItemValue(val, header) {
    const headerItem = columns.find((column) => column.headerName === header);
    const headerItemSelect = headerItem?.renderEditCell?.name;

    if (headerItemSelect === "StatusEditCell") {
      return options[headerItem.field]?.find((item) => item.id === val).text;
    } else if (headerItemSelect === "DateEditCell") return formatDate(val);

    return val;
  }

  function newItemsText() {
    const columnSearched = columns
      .filter((val) => val.field !== "id" && val.editable)
      .map((val) => val.field);

    let infosText: any[] = [];

    for (const item of editedItems.newItems) {
      infosText = [
        ...infosText,
        columnSearched
          .map((val) => {
            const headerName = columns.find(
              (val2) => val === val2.field
            ).headerName;
            return `${headerName}: ${
              selectItemValue(item[val], headerName) || t("null")
            }`;
          })
          .join(" | "),
      ];
    }

    return `${infosText.join("\n\n")}`;
  }

  function editedItemsText() {
    const columnSearched = columns
      .filter((val) => val.field !== "id" && val.editable)
      .map((val) => val.field);

    let infosText: any[] = [];

    for (const item of editedItems.editedItems) {
      infosText = [
        ...infosText,
        columnSearched
          .map((val) => {
            const columnHeader = columns.find(
              (val2) => val === val2.field
            ).headerName;
            const columnEdited = Object.keys(item).includes(val);

            if (columnEdited) {
              return `${columnHeader}: ${
                selectItemValue(
                  currentData.find((val2) => val2.id === item.id)[val],
                  columnHeader
                ) || t("null")
              } > ${selectItemValue(item[val], columnHeader) || t("null")}`;
            } else {
              return `${columnHeader}: ${
                selectItemValue(
                  currentData.find((val2) => val2.id === item.id)[val],
                  columnHeader
                ) || t("null")
              }`;
            }
          })
          .join(" | "),
      ];
    }

    return `${infosText.join("\n\n")}`;
  }

  function removedItemsText() {
    const columnSearched = columns
      .filter((val) => val.field !== "id" && val.editable)
      .map((val) => val.field);

    let infosText: any[] = [];

    for (const id of editedItems.removedItems) {
      infosText = [
        ...infosText,
        columnSearched
          .map((val) => {
            const columnHeader = columns.find(
              (val2) => val === val2.field
            ).headerName;

            return `${columnHeader}: ${
              selectItemValue(
                currentData.find((val2) => val2.id === id)[val],
                columnHeader
              ) || t("null")
            }`;
          })
          .join(" | "),
      ];
    }

    return `${infosText.join("\n\n")}`;
  }

  function handleClose() {
    if (!loading) {
      onClose();
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="settings-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "var(--background-light)",
          borderRadius: 2,
          width: "100%",
          maxWidth: fullscreen || isMobile ? "100%" : "50rem",
          minHeight: fullscreen ? "100%" : "0px",
          maxHeight: fullscreen ? "100%" : "90vh",
          display: "flex",
          flexDirection: "column",
          margin: fullscreen ? "0" : "1rem",
          overflow: "auto",
        }}
      >
        <TitleClose>
          <h2 className="title">{t("confirm_changes")}</h2>
          <div className="icons-group">
            {!isMobile && (
              <button onClick={handdleFullScreen}>
                {fullscreen ? (
                  <BiExitFullscreen fontSize={20} />
                ) : (
                  <BiFullscreen fontSize={20} />
                )}
              </button>
            )}
            <button onClick={handleClose}>
              <RiCloseLine fontSize={25} />
            </button>
          </div>
        </TitleClose>

        <Divider />

        <ContentContainer fullscreen={fullscreen ? "1" : "0"}>
          {editedItems.newItems?.length > 0 && (
            <Accordion
              expanded={expanded.includes("create")}
              onChange={() => handleChange("create")}
            >
              <AccordionSummary
                aria-controls="create-content"
                id="create-header"
              >
                <Typography component="span">{t("created_items")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ whiteSpace: "pre-line" }}>
                  {newItemsText()}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {editedItems.editedItems?.length > 0 && (
            <Accordion
              expanded={expanded.includes("edit")}
              onChange={() => handleChange("edit")}
            >
              <AccordionSummary aria-controls="edit-content" id="edit-header">
                <Typography component="span">{t("edited_items")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ whiteSpace: "pre-line" }}>
                  {editedItemsText()}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {editedItems.removedItems?.length > 0 && (
            <Accordion
              expanded={expanded.includes("remove")}
              onChange={() => handleChange("remove")}
            >
              <AccordionSummary
                aria-controls="remove-content"
                id="remove-header"
              >
                <Typography component="span">{t("removed_items")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ whiteSpace: "pre-line" }}>
                  {removedItemsText()}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <div />
            <GroupButtons>
              <Button
                variant="outlined"
                onClick={handleClose}
                loadingPosition="start"
                color="primary"
                loading={false}
              >
                {t("return")}
              </Button>
              <Button
                variant="contained"
                loadingPosition="start"
                onClick={confirmChanges}
                color="primary"
                loading={loading}
              >
                {t("confirm")}
              </Button>
            </GroupButtons>
          </div>
        </ContentContainer>
      </Box>
    </Modal>
  );
}
