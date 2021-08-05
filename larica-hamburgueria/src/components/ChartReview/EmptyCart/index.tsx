import React from "react";

import {
  Container
} from "./styles";

import addToChartLogo from "../../../assets/add-to-chart-image.jpg";

const EmptyCart: React.FC = () => {
  return (
    <Container>
      <img src={addToChartLogo} alt="Empty chart" />
      <span>Ainda não fez seu pedido?</span>
      <span>Relaxa, pede aí!</span>
    </Container>
  );
};

export default EmptyCart;
