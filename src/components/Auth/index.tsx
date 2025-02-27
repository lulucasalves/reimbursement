import { useStatus } from "~/src/contexts/state";
import { ComponentDarkModeToggle } from "../DarkModeToggle";
import ComponentLanguageToggle from "../LanguageToggle";
import {
  Container,
  ContentSide,
  ImageSide,
  ContentOptions,
  ButtonsGroup,
} from "./styles";
import { IconEmail, IconGoogle, IconLinkedin, IconOutlook } from "../Icon";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ComponentAuth() {
  const [loading, setLoading] = useState<string>("");
  const router = useRouter();

  const { t } = useStatus();
  const iconsHeight = 30;

  const authOptions = [
    {
      title: t("auth_google"),
      icon: <IconGoogle height={iconsHeight} />,
      callback: () => authGoogle(t("auth_google")),
    },
    {
      title: t("auth_outlook"),
      icon: <IconOutlook height={iconsHeight} />,
      callback: () => authOutlook(t("auth_outlook")),
    },
    {
      title: t("auth_linkedin"),
      icon: <IconLinkedin height={iconsHeight} />,
      callback: () => authLinkedin(t("auth_linkedin")),
    },
    {
      title: t("auth_email"),
      icon: <IconEmail height={iconsHeight} />,
      callback: () => authEmail(),
    },
  ];

  function authGoogle(value: string) {
    setLoading(value);
    console.log("google");
  }

  function authOutlook(value: string) {
    setLoading(value);

    console.log("outlook");
  }

  function authLinkedin(value: string) {
    setLoading(value);

    console.log("linkedin");
  }

  function authEmail() {
    router.push("auth-email");
  }

  return (
    <Container>
      <ContentOptions>
        <ComponentDarkModeToggle />
        <ComponentLanguageToggle />
      </ContentOptions>
      <ContentSide>
        <div className="content">
          <h1>{t("auth_title")}</h1>
          <h3>{t("auth_description")}</h3>
          <ButtonsGroup>
            {authOptions.map((val) => (
              <Button
                onClick={val.callback}
                variant="outlined"
                loadingPosition="start"
                fullWidth
                color="inherit"
                loading={loading === val.title}
                key={val.title}
                startIcon={val.icon}
                sx={{
                  fontSize: "0.9rem",
                }}
              >
                {val.title}
              </Button>
            ))}
          </ButtonsGroup>
        </div>
      </ContentSide>
      <ImageSide />
    </Container>
  );
}
