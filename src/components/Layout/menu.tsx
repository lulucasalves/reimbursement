import { Container, ContainerImage } from "./styles";
import { ComponentLogo } from "./logo";
import { useAuth } from "~/src/contexts/auth";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IconNotification, IconSettings } from "../Icon";
import Image from "next/image";

export function ComponentLayoutMenu() {
  const { company, companies, changeCompany } = useAuth();

  function changeCompanyToggle(e: SelectChangeEvent) {
    changeCompany(parseInt(e.target.value));
  }

  return (
    <Container>
      <div className="group-items">
        <div className="item1">
          <ComponentLogo />
        </div>
        <div className="item2">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small-label"
              value={String(company)}
              onChange={changeCompanyToggle}
              sx={{ fontSize: "1rem" }}
            >
              {companies.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="group-items">
        <div className="group-icons">
          <div className="item3">
            <IconButton size="large">
              <IconNotification height={22} />
            </IconButton>
          </div>
          <div className="item4">
            <IconButton size="large">
              <IconSettings height={22} />
            </IconButton>
          </div>
        </div>
        <IconButton>
          <ContainerImage>
            <Image
              alt="user"
              src="/lucas.jpeg"
              loading="lazy"
              width={50}
              height={50}
            />
          </ContainerImage>
        </IconButton>
      </div>
    </Container>
  );
}
