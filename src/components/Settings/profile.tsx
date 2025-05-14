import { useStatus } from "~/src/contexts/state";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { ContainerPreferences, ItemsGroup } from "./styles";
import { useState } from "react";

export default function ComponentProfile() {
  const { t } = useStatus();
  const [name, setName] = useState("Nome do Usuário");
  const [email] = useState("usuario@email.com");
  const [avatar, setAvatar] = useState("/default-avatar.png");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ContainerPreferences>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 2,
          gap: 3,
          padding: 2,
        }}
      >
        <Avatar src={avatar} sx={{ width: 120, height: 120 }} />

        <Button variant="outlined" component="label">
          Alterar Foto
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </Button>

        <ItemsGroup>
          <h2>{t("name")}: </h2>
          <TextField
            value={name}
            onChange={handleNameChange}
            size="small"
            sx={{ minWidth: 250 }}
          />
        </ItemsGroup>

        <ItemsGroup>
          <h2>{t("auth_email")}: </h2>
          <TextField
            value={email}
            disabled
            size="small"
            sx={{ minWidth: 250 }}
          />
        </ItemsGroup>
      </Box>
    </ContainerPreferences>
  );
}
