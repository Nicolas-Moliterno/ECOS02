import React from "react";

import { Container } from "./styles";

import emptyAdditionals from "../../../assets/empty-additionals.jpg";

const EmptyAdditionals: React.FC = () => {
  return (
    <Container>
      <img src={emptyAdditionals} alt="Additional empty" />
      <span>Pô, nenhum adicional pra esse lanche</span>
    </Container>
  );
};

export default EmptyAdditionals;
