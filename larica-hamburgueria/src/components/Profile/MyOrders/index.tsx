import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import { Container, Separator, EmptyMyOrders } from "./styles";
import getValidationErrors from "../../../utils/ValidationErros";
import Input from "../../Input";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { IoPencilSharp } from "react-icons/io5";
import { formatDistance, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface IProps {
  myOrdersView: any;
  setMyOrdersView: any;
  setProfileView: any;
  setChartReview: any;
  setOrders: any;
  setAddress: any;
  setPaymentType: any;
}

const MyOrders: React.FC<IProps> = ({
  myOrdersView,
  setMyOrdersView,
  setProfileView,
  setChartReview,
  setOrders,
  setAddress,
  setPaymentType,
}) => {
  const { getOrdersByUserId, myOrders }: any = useAuth();

  useEffect(() => {
    loadOrders();
    async function loadOrders() {
      try {
        await getOrdersByUserId();
      } catch {
        toast.error("Falha ao carregar os pedidos!");
      }
    }
  }, []);

  function makeOrderAgain(order: any) {
    setOrders(order.orders);
    setAddress(order.address);
    setPaymentType(order.payment);
    setMyOrdersView(false);
    setProfileView(false);
    setChartReview(true);
  }

  return (
    <Container className={myOrdersView ? "my-orders-open" : ""}>
      <h2>Meus pedidos</h2>
      <p>
        Total: <span>{myOrders.length}</span>
      </p>
      {myOrders.length === 0 ? (
        <EmptyMyOrders>
          <span>Não há pedidos, por enquanto!</span>
        </EmptyMyOrders>
      ) : (
        <section>
          {myOrders.slice(0, 5).map((order: any, index) => {
            if (index < 5) {
              return (
                <section>
                  <div>
                    {order.orders.map((order): any => (
                      <div>
                        <span>
                          {order.orderDetails.item.name}{" "}
                          <span>{order.orderDetails.productAmount}x </span>
                        </span>
                        <p>
                          {order.orderDetails.additionals
                            .filter((additional: any) => {
                              return additional.amount === 0 ? false : true;
                            })
                            .map((additional: any) => (
                              <>
                                {additional.name}
                                <span key={additional.id}>
                                  {" "}
                                  {additional.amount}x
                                </span>
                              </>
                            ))}
                        </p>
                      </div>
                    ))}
                  </div>
                  <span>R${Number(order.total).toFixed(2)}</span>
                  <p>
                    {formatDistance(
                      order.createdAt.seconds * 1000,
                      new Date(),
                      {
                        addSuffix: true,
                        locale: ptBR,
                      }
                    )}
                  </p>
                  <button onClick={() => makeOrderAgain(order)}>
                    <span>Pedir novamente</span>
                  </button>
                </section>
              );
            }
          })}

          <div onClick={() => {}}>
            {myOrders.length >= 5 ? <span>Ver todos...</span> : <></>}
          </div>
        </section>
      )}

      <button
        onClick={() => {
          setMyOrdersView(false);
        }}
      >
        <span>Voltar</span>
      </button>
    </Container>
  );
};

export default MyOrders;
