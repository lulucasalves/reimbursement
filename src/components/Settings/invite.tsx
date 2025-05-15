import { useStatus } from "~/src/contexts/state";
import { useState, useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import api from "~/src/services/api";

export default function ComponentInvite() {
  const { t } = useStatus();
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const result = await api.get("/employee-invite");

    setInvites(result.data);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        loadData();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleVerify(employeeId, status) {
    setLoading(true);

    try {
      await api.get(`/employee-invite/verify/${employeeId}/${status}`);

      await loadData();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="invites-container">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        invites.map((val: any) => {
          return (
            <div key={val.employeeInviteId} className="invite-item">
              <p>{val.company}</p>
              <div className="invite-buttons">
                <Button
                  variant="outlined"
                  loadingPosition="start"
                  onClick={() => handleVerify(val.employeeId, "refused")}
                  color="error"
                  sx={{
                    fontSize: "0.75rem",
                  }}
                >
                  {t("refuse")}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleVerify(val.employeeId, "verified")}
                  loadingPosition="start"
                  color="primary"
                  sx={{
                    fontSize: "0.75rem",
                  }}
                >
                  {t("accept")}
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
