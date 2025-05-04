import { useStatus } from "~/src/contexts/state";
import { Container } from "./styles";
import ComponentTable from "../Table";
import { useEffect, useState } from "react";
import api from "~/src/services/api";
import { useAuth } from "~/src/contexts/auth";
import { companyStatus } from "~/src/utils/contants";

export function ComponentCompanys() {
  const { t } = useStatus();
  const { currentAmbient } = useAuth();
  const [options, setOptions] = useState({
    statusId: [],
    currencyId: [],
    dateFormatId: [],
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const [status, currency, monthFormat, data] = (
          await Promise.all([
            api.post("/company-status", {}),
            api.post("/currency", {}),
            api.post("/date-format", {}),
            api.post("/company", {
              filters: {
                ambientId: currentAmbient,
              },
            }),
          ])
        ).map((val) => val.data);

        setOptions({
          statusId: status.map((val) => ({
            id: val.statusId,
            text: val.status,
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

        setData(data.map((val) => ({ ...val, id: val.companyId })));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function confirmChanges(val) {
    setEditLoading(true);

    try {
      const response = await api.post("/company/update", {
        ...val,
        ambientId: currentAmbient,
      });

      if (response.data.success) {
        if (val.delete.length) location.reload();

        setLoading(true);

        const result = await api.post("/company", {
          filters: {
            ambientId: currentAmbient,
          },
        });

        setData(result.data.map((val) => ({ ...val, id: val.companyId })));

        return { success: true, message: "" };
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.response.data.detail || err.message,
      };
    } finally {
      setEditLoading(false);
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
        defaultAdd={{ statusId: companyStatus.activeId }}
        editLoading={editLoading}
        confirmChanges={confirmChanges}
      />
    </Container>
  );
}
