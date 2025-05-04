import { useStatus } from "~/src/contexts/state";
import { ComponentDarkModeToggle } from "../DarkModeToggle";
import ComponentLanguageToggle from "../LanguageToggle";
import {
  Container,
  ContentSide,
  ImageSide,
  ContentOptions,
  EmailGroupButtons,
} from "./styles";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useAuth } from "~/src/contexts/auth";
import api from "~/src/services/api";

export function ComponentAuthEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [insertCode, setInsertCode] = useState("");

  const { t } = useStatus();
  const { setAmbient } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (timer > 0 && timerRunning) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setTimerRunning(false);
    }
  }, [timer, timerRunning]);

  function returnAuth() {
    router.push("auth");
  }

  async function sendEmailCode(value: string) {
    setLoading(true);

    try {
      const response = await api.post("/auth/generate-email-code", {
        email: value,
      });

      nextPage(2);
      setTimer(response.data.timer);
      setTimerRunning(true);

      return true;
    } catch (err: any) {
      setError(err.response.data.detail || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function submitNext(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;

    setEmail(email);

    await sendEmailCode(email);
  }

  async function resendCode() {
    await sendEmailCode(email);
  }

  function nextPage(value: number) {
    setError("");
    setLoading(false);
    setPage(value);
    setTimer(0);
    setTimerRunning(false);
  }

  async function handleChange(value: string) {
    const valueJustNumbers = value.replace(/\D/g, "").slice(0, 6);

    setInsertCode(valueJustNumbers);

    if (valueJustNumbers.length === 6) {
      setLoading(true);

      try {
        const response = await api.post("/auth/email", {
          email: email,
          code: valueJustNumbers,
        });

        nextPage(2);
        setTimer(response.data.timer);
        setTimerRunning(true);

        setError("");
        const token = response.data.token;
        const userData = response.data.userData;
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));

        if (userData.ambients.length > 1) {
          router.push("ambients");
        } else {
          setAmbient(userData.ambients[0].ambient_id);
          router.push("dashboard");
        }
      } catch (err: any) {
        setError(err.response.data.detail || err.message);
        setLoading(false);
      }
    } else setLoading(false);
  }

  return (
    <Container>
      <ContentOptions>
        <ComponentDarkModeToggle />
        <ComponentLanguageToggle />
      </ContentOptions>
      <ContentSide>
        <div className="content">
          {page === 1 ? (
            <>
              <h1>{t("auth_title")}</h1>
              <h3>{t("auth_email_description")}</h3>
              <form onSubmit={(e) => submitNext(e)} style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  sx={{ width: "100%" }}
                  maxRows={6}
                  label={t("auth_email_description")}
                  variant="outlined"
                  error={!!error}
                  helperText={error}
                />
                <EmailGroupButtons>
                  <Button
                    onClick={() => returnAuth()}
                    variant="outlined"
                    loadingPosition="start"
                    sx={{
                      borderColor: "var(--foreground)",
                      color: "var(--foreground)",
                      "&:hover": {
                        backgroundColor: "var(--background)",
                        borderColor: "var(--foreground)",
                      },
                      fontSize: "0.9rem",
                    }}
                  >
                    {t("return")}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    loading={loading}
                    sx={{
                      fontSize: "0.9rem",
                    }}
                  >
                    {t("next")}
                  </Button>
                </EmailGroupButtons>
              </form>
            </>
          ) : loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <h1>{t("auth_confirm_email")}</h1>
              <h4>
                {t("auth_code_description")} {email}
              </h4>
              <TextField
                fullWidth
                error={!!error}
                helperText={error}
                onChange={(event) => handleChange(event.target.value)}
                type="text"
                value={insertCode}
                label={t("received_code")}
                variant="outlined"
                autoComplete="off"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <EmailGroupButtons>
                <Button
                  onClick={() => nextPage(1)}
                  variant="outlined"
                  loadingPosition="start"
                  sx={{
                    borderColor: "var(--foreground)",
                    color: "var(--foreground)",
                    "&:hover": {
                      backgroundColor: "var(--background)",
                      borderColor: "var(--foreground)",
                    },
                    fontSize: "0.9rem",
                  }}
                >
                  {t("return")}
                </Button>
                <Button
                  onClick={() => resendCode()}
                  variant="contained"
                  loading={loading}
                  disabled={!!timer}
                  sx={{
                    fontSize: "0.9rem",
                  }}
                >
                  {t("resend_code")} {timer ? `(${timer})` : ""}
                </Button>
              </EmailGroupButtons>
            </>
          )}
        </div>
      </ContentSide>
      <ImageSide />
    </Container>
  );
}
