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

export function ComponentAuthEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [insertCode, setInsertCode] = useState("");
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

  const { t } = useStatus();

  function returnAuth() {
    router.push("auth");
  }

  async function sendEmailCode(value: string) {
    return { status: 200, message: "123456", value };
  }

  async function submitNext(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;

    setLoading(true);
    const { status, message } = await sendEmailCode(email);

    if (status === 200) {
      nextPage(2);
      setEmail(email);
      setCode(message);
      setTimer(30);
      setTimerRunning(true);
    } else {
      setError(message);
    }

    setLoading(false);
  }

  async function resendCode() {
    setLoading(true);
    const { message } = await sendEmailCode(email);

    setEmail(email);
    setCode(message);
    setTimer(30);
    setTimerRunning(true);
    setLoading(false);
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
      const verifyCode =
        valueJustNumbers === code
          ? { status: 200, message: "eth" }
          : { status: 400, message: "Código incorreto" };

      if (verifyCode.status === 200) {
        setError("");
        const token = verifyCode.message;
        localStorage.setItem("token", token);
        router.push("dashboard");
      } else {
        setError(verifyCode.message);
      }
    }

    setLoading(false);
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
