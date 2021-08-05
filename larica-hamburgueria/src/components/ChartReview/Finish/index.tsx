import React, { useEffect, useState } from "react";

import { Container, ProgressBar, CancelOrder } from "./styles";

import pending from "../../../assets/pending.jpg";
import preparing from "../../../assets/preparing.jpg";
import delivering from "../../../assets/delivering.jpg";
import canceled from "../../../assets/canceled-order.jpg";
import canceledByAdmin from "../../../assets/canceled.jpg";
import confirmed from "../../../assets/indication.jpg";

import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

interface IProps {
  setBuy: any;
  cancelable: any;
  setCancelable: any;
}

const Finish: React.FC<IProps> = ({ setBuy, cancelable, setCancelable }) => {
  const [color, setColor] = useState("#27303b");
  const { getStatusById, updateOrderStatus, status }: any = useAuth();
  const statusConfig = {
    images: {
      pending,
      preparing,
      delivering,
      canceled,
      confirmed,
    },
    colors: {
      pending: "#27303b",
      preparing: "#CF68CC",
      delivering: "#29E7CD",
      canceled: "#c14953",
      confirmed: "#27af9a",
    },
    messages: {
      pending: {
        primary: "Estamos confirmando seu pedido.",
        secondary: "Por favor, aguarde...",
      },
      preparing: {
        primary: "Começamos preparar seu pedido.",
        secondary: "Em breve, enviaremos...",
      },
      delivering: {
        primary: "Boa noticia!",
        secondary: "Seu pedido saiu para entrega.",
      },
      canceled: {
        primary: "Não temos ingredientes o suficiente",
        secondary: "para este pedido, lamentamos!",
      },
      confirmed: {
        primary: "Agradecemos seu pedido!",
        secondary: "Aproveite a noite.",
      },
    },
  };

  useEffect(() => {
    const localOrderStatusId: any = localStorage.getItem("order-status-id");
    const retrievedOrderStatus: any = JSON.parse(localOrderStatusId);

    loadOrder();

    async function loadOrder() {
      if (retrievedOrderStatus) {
        try {
          await getStatusById(retrievedOrderStatus.statusId);
          setColor(statusConfig?.colors[status.status]);
        } catch {
          toast.error("Erro ao carregar o do pedido.");
        }
      }
    }

    statusCompletedOrCanceled();
  }, [status.status]);

  function statusCompletedOrCanceled() {
    if (status.status === "completed") {
      localStorage.removeItem("order-status-id");
      setBuy(false);
    }

    if (status.status !== "pending") {
      setCancelable(false);
    }

    if (status.status === "pending") {
      setCancelable(true);
    }
  }

  async function cancelOrder() {
    try {
      const localOrderStatusId: any = localStorage.getItem("order-status-id");
      const retrievedOrderStatus: any = JSON.parse(localOrderStatusId);

      if (retrievedOrderStatus) {
        await updateOrderStatus(
          "canceled",
          String(retrievedOrderStatus.statusId),
          String(retrievedOrderStatus.orderId),
          "user"
        );
        setCancelable(false);
      } else {
        toast.error("Não foi possível cancelar o pedido.");
      }
    } catch {
      toast.error("Não foi possível cancelar o pedido.");
    }
  }

  return (
    <Container>
      {status.status === "canceled" ? (
        status.canceledBy === "user" ? (
          <>
            <img src={canceledByAdmin} alt="Finish order" />
            <span>Ficamos tristes em não agradá-lo</span>
            <span>Aproveite a noite!</span>
          </>
        ) : (
          <>
            <img src={statusConfig?.images[status.status]} alt="Finish order" />
            <span>{statusConfig?.messages[status.status]?.primary}</span>
            <span>{statusConfig?.messages[status.status]?.secondary}</span>
          </>
        )
      ) : (
        <>
          <img src={statusConfig?.images[status.status]} alt="Finish order" />
          <span>{statusConfig?.messages[status.status]?.primary}</span>
          <span>{statusConfig?.messages[status.status]?.secondary}</span>
        </>
      )}
      <ProgressBar status={status.status} color={color}>
        <div>
          <div className="line"></div>
          <div className="subline"></div>
        </div>
      </ProgressBar>
      {cancelable ? (
        <CancelOrder onClick={() => cancelOrder()}>
          <span>Cancelar pedido</span>
        </CancelOrder>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Finish;
