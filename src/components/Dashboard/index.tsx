import { useState } from "react";
import { CardItem, CardsContainer, Container, SelectGroup } from "./styles";
import { ComponentChipSelect } from "../Selects/Chip";

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

  return (
    <Container>
      <h2 className="title">Dashboard</h2>
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
          <h3>Total de Reembolsos</h3>
          <p>R$ 10.000,00</p>
        </CardItem>
        <CardItem>
          <h3>Reembolsos Pendentes</h3>
          <p>R$ 10.000,00</p>
        </CardItem>
        <CardItem>
          <h3>Reembolsos Aprovados</h3>
          <p>R$ 10.000,00</p>
        </CardItem>
      </CardsContainer>
    </Container>
  );
}
