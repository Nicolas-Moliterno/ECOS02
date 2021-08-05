import React, { useEffect, useState } from "react";

import { Container } from "./styles";

import { Link, animateScroll as scroll } from "react-scroll";

import { IoClose, IoPencilSharp } from "react-icons/io5";
import ChangePayment from "./ChangePayment";
import { useAuth } from "../../../context/AuthContext";

interface IProps {
  paymentType: any;
  setPaymentType: any;
}

const Payments: React.FC<IProps> = ({ paymentType, setPaymentType }) => {
  const [editPayment, setEditPayment] = useState(false);

  useEffect(() => {
    choosePaymentType();
  }, []);

  function choosePaymentType() {
    const paymentTypeStorage: any = localStorage.getItem(
      "larica-my-payment-type"
    );

    if (paymentTypeStorage) {
      setPaymentType(JSON.parse(paymentTypeStorage));
    }
  }

  const messages = {
    money: {
      name: "Dinheiro",
      message:
        paymentType.change !== 0 ? (
          <p>
            Então tá bom, troco pra <span>{paymentType.change}</span> anotado!
          </p>
        ) : (
          <p>Aí sim, não vai precisar de troco então!</p>
        ),
    },
    creditCard: {
      name: "Cartão de crédito",
      message: <p>Beleza, já vou separar a máquininha!</p>,
    },
    debitCard: {
      name: "Cartão de débito",
      message: <p>Beleza, já vou separar a máquininha!</p>,
    },
  };

  return (
    <Container>
      <div>
        <span>Detalhes do pagamento</span>
      </div>
      <div>
        <div>
          <div>
            <span>{messages[paymentType.type]?.name}</span>
            {messages[paymentType.type]?.message}
          </div>
          <button
            type="button"
            onClick={() => {
              setEditPayment(!editPayment);
            }}
          >
            <div></div>
            {editPayment ? (
              <IoClose color="#27af9a" size="20" />
            ) : (
              <IoPencilSharp color="#27af9a" size="20" />
            )}
          </button>
        </div>
        <ChangePayment
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          editPayment={editPayment}
          setEditPayment={setEditPayment}
        />
      </div>
    </Container>
  );
};

export default Payments;
