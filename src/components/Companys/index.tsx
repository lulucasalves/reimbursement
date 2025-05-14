import { useStatus } from "~/src/contexts/state";
import { Container } from "./styles";
import ComponentTable from "../Table";
import { useEffect, useState } from "react";
import api from "~/src/services/api";
import { useAuth } from "~/src/contexts/auth";
import { companyStatus } from "~/src/utils/contants";

export function ComponentCompanys() {
  const { t, formatDate } = useStatus();
  const { currentAmbient } = useAuth();
  const [options, setOptions] = useState({
    statusId: [],
    currencyId: [],
    dateFormatId: [],
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCompanys() {
    const result = await api.post("/company", {
      filters: {
        ambientId: currentAmbient,
      },
    });

    setData(
      result.data.map((val) => ({
        ...val,
        id: val.companyId,
        createdAt: formatDate(val.createdAt),
      }))
    );

    return result;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const [status, currency, monthFormat] = (
          await Promise.all([
            api.post("/company-status", {}),
            api.post("/currency", {}),
            api.post("/date-format", {}),
            getCompanys(),
          ])
        ).map((val) => val.data);

        setOptions({
          statusId: status.map((val) => ({
            id: val.statusId,
            text: t(`${val.status}_status`),
          })),
          currencyId: currency.map((val) => ({
            id: val.currencyId,
            text: val.symbol,
          })),
          dateFormatId: monthFormat.map((val) => ({
            id: val.dateFormatId,
            text: val.dateFormat,
          })),
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function confirmChanges(val) {
    setLoading(true);

    try {
      const response = await api.post("/company/update", {
        ...val,
        ambientId: currentAmbient,
      });

      if (response.data.success) {
        if (val.delete.length) location.reload();

        await getCompanys();

        return { success: true, message: "" };
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.response.data.detail ?? err.message,
      };
    } finally {
      setLoading(false);
    }

    return { success: true, message: "" };
  }

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "name",
      headerName: t("company"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      required: true,
      unique: true,
    },
    {
      field: "statusId",
      headerName: t("status"),
      flex: 1,
      align: "left",
      minWidth: 150,
      headerAlign: "left",
      editable: true,
      renderEditCell: "select",
      required: true,
      filterable: false,
    },
    {
      field: "currencyId",
      headerName: t("currency"),
      flex: 1,
      align: "left",
      minWidth: 150,
      headerAlign: "left",
      editable: true,
      renderEditCell: "select",
      required: true,
      filterable: false,
    },
    {
      field: "dateFormatId",
      headerName: t("month_format"),
      flex: 1,
      align: "left",
      minWidth: 150,
      headerAlign: "left",
      editable: true,
      renderEditCell: "select",
      required: true,
      filterable: false,
    },
    {
      field: "createdAt",
      headerName: t("created_at"),
      flex: 1,
      align: "left",
      minWidth: 150,
      headerAlign: "left",
      editable: false,
      required: false,
    },
  ];

  return (
    <Container>
      <h2 className="title">{t("companys")}</h2>
      <ComponentTable
        options={options}
        data={data}
        columns={columns}
        loading={loading}
        invisibleColumns={{ id: false }}
        defaultAdd={{ statusId: companyStatus.activeId, createdAt: formatDate() }}
        confirmChanges={confirmChanges}
      />
    </Container>
  );
}
