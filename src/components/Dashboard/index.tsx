import { useState } from "react";
import {
  CardItem,
  CardsContainer,
  Container,
  GraphContainer,
  SelectGroup,
} from "./styles";
import { ComponentChipSelect } from "../Selects/Chip";
import { BarChart } from "@mui/x-charts/BarChart";
import { useStatus } from "~/src/contexts/state";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

export function ComponentDashboard() {
  const [months] = useState([
    { value: 1, label: "Janeiro/2025" },
    { value: 2, label: "Fevereiro/2025" },
    { value: 3, label: "Março/2025" },
    { value: 4, label: "Abril/2025" },
    { value: 5, label: "Maio/2025" },
    { value: 6, label: "Junho/2025" },
    { value: 7, label: "Julho/2025" },
    { value: 8, label: "Agosto/2025" },
    { value: 9, label: "Setembro/2025" },
    { value: 10, label: "Outubro/2025" },
    { value: 11, label: "Novembro/2025" },
    { value: 12, label: "Dezembro/2025" },
  ]);
  const [events] = useState([
    { value: 1, label: "Evento 1" },
    { value: 2, label: "Evento 2" },
    { value: 3, label: "Evento 3" },
    { value: 4, label: "Evento 4" },
    { value: 5, label: "Evento 5" },
  ]);
  const { t } = useStatus();

  const chartSetting = {
    yAxis: [
      {
        label: t("refunds"),
      },
    ],
    height: 340,
    sx: {
      flexGrow: 1,
    },
  };

  const rows = [
    {
      id: 1,
      employee: "Funcionário 1",
      event: "Evento 1",
      status: "Aprovado",
      value: "R$ 100,00",
      updatedAt: "01/01/2025",
    },
    {
      id: 1,
      employee: "Funcionário 1",
      event: "Evento 1",
      status: "Aprovado",
      value: "R$ 100,00",
      updatedAt: "01/01/2025",
    },
  ];

  return (
    <Container>
      <h2 className="title">{t("dashboard")}</h2>
      <SelectGroup>
        <ComponentChipSelect
          id="months"
          width="350px"
          options={months}
          label="monthYear"
          limitTags={2}
        />
        <ComponentChipSelect
          id="events"
          width="350px"
          options={events}
          label="events"
          limitTags={2}
        />
      </SelectGroup>
      <CardsContainer>
        <CardItem>
          <h3>{t("totalRefunds")}</h3>
          <p>R$ 10.000,00</p>
        </CardItem>
        <CardItem>
          <h3>{t("pendingRefunds")}</h3>
          <p>R$ 10.000,00</p>
        </CardItem>
        <CardItem>
          <h3>{t("approvedRefunds")}</h3>
          <p>R$ 10.000,00</p>
        </CardItem>
      </CardsContainer>
      <GraphContainer>
        <div className="graph-container">
          <h3>{t("refundsByEvent")}</h3>
          <BarChart
            dataset={[
              {
                london: 59,
                paris: 57,
                newYork: 86,
                seoul: 21,
                month: "Jan",
              },
              {
                london: 50,
                paris: 52,
                newYork: 78,
                seoul: 28,
                month: "Fev",
              },
            ]}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              { dataKey: "london", label: "Evento 1" },
              { dataKey: "paris", label: "Evento 2" },
              { dataKey: "newYork", label: "Evento 3" },
              { dataKey: "seoul", label: "Evento 4" },
            ]}
            {...chartSetting}
          />
        </div>
        <div className="graph-container table-container">
          <h3>{t("lastRefunds")}</h3>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("employee")}</TableCell>
                  <TableCell>{t("event")}</TableCell>
                  <TableCell>{t("status")}</TableCell>
                  <TableCell>{t("value")}</TableCell>
                  <TableCell>{t("updatedAt")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      {t("noRefundAvailable")}
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Tooltip title={row.employee}>
                          <span>{row.employee}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={row.event}>
                          <span>{row.event}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={row.status}>
                          <span>{row.status}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={row.value}>
                          <span>{row.value}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={row.updatedAt}>
                          <span>{row.updatedAt}</span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </GraphContainer>
    </Container>
  );
}
