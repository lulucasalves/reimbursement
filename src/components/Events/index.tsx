import { useStatus } from "~/src/contexts/state";
import { Container } from "./styles";
import ComponentTable from "../Table";
import dayjs from "dayjs";
import { useAuth } from "~/src/contexts/auth";
import api from "~/src/services/api";
import { useEffect, useState } from "react";
import { eventStatus } from "~/src/utils/contants";

export function ComponentEvents() {
  const { t } = useStatus();
  const { company } = useAuth();
  const [options, setOptions] = useState({
    statusId: [],
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getEvents() {
    const result = await api.post("/event", {
      filters: {
        companyId: company,
      },
    });

    setData(
      result.data.map((val) => ({
        ...val,
        id: val.eventId,
        startDate: dayjs(val.startDate),
        endDate: dayjs(val.endDate),
      }))
    );

    return result;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const [status] = (
          await Promise.all([api.post("/event-status", {}), getEvents()])
        ).map((val) => val.data);

        setOptions({
          statusId: status.map((val) => ({
            id: val.statusId,
            text: t(`${val.status}_status`),
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
      const response = await api.post("/event/update", {
        ...val,
        companyId: company,
      });

      if (response.data.success) {
        await getEvents();

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
      headerName: t("event"),
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
      field: "startDate",
      headerName: t("init_date"),
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "date",
      required: true,
    },
    {
      field: "endDate",
      headerName: t("end_date"),
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "date",
      required: true,
    },
  ];

  return (
    <Container>
      <h2 className="title">{t("events")}</h2>
      <ComponentTable
        options={options}
        data={data}
        columns={columns}
        loading={loading}
        invisibleColumns={{ id: false }}
        defaultAdd={{
          statusId: eventStatus.activeId,
          startDate: dayjs(),
        }}
        confirmChanges={confirmChanges}
      />
    </Container>
  );
}
