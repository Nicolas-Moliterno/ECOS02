import React from "react";

import {
  Container
} from "./styles";

import canceled from "../../../assets/canceled.jpg";

const CanceledOrder: React.FC = () => {
  return (
    <Container>
      <img src={canceled} alt="Empty chart" />
      <span>Ficamos tristes em não agradá-lo</span>
      <span>Aproveite a noite!</span>
    </Container>
  );
};

export default CanceledOrder;
