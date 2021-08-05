import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

import {
  Container,
  OrdersContent,
  BodyContent,
  DetailsOrder,
  Table,
  TableHeader,
  TableContent,
  TableRow,
  Separator,
  Address,
  PaymentType,
  Orders,
} from "./styles";

export const Order: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { getTodaysOrders, orders, updateOrderStatus }: any = useAuth();
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any>({});

  function handleItemClicked(order) {
    setSelectedOrder(order.orderId);
    setSelectedOrderDetails(order);
  }

  const statusConfig = {
    names: {
      pending: "Pendente",
      preparing: "Preparando",
      delivering: "Entregando",
      confirmed: "Finalizado",
      canceled: "Cancelado",
    },
    colors: {
      pending: {
        hex: "#FF6B6B",
      },
      preparing: {
        hex: "#CF68CC",
      },
      delivering: {
        hex: "#3F88C5",
      },
      confirmed: {
        hex: "#2A9D8F",
      },
      canceled: {
        hex: "#BCABAE",
      },
    },
    index: {
      pending: 0,
      preparing: 1,
      delivering: 2,
      confirmed: 3,
      canceled: 4,
    },
    enum: {
      0: "pending",
      1: "preparing",
      2: "delivering",
      3: "confirmed",
      4: "canceled",
    },
  };

  const messages = {
    money: {
      name: "Dinheiro",
      message:
        selectedOrderDetails?.payment?.change !== 0 ? (
          <p>
            Troco para <span>R${selectedOrderDetails?.payment?.change}</span>
          </p>
        ) : (
          <p>Não vai precisar de troco.</p>
        ),
    },
    creditCard: {
      name: "Cartão de crédito",
    },
    debitCard: {
      name: "Cartão de débito",
    },
  };

  useEffect(() => {
    loadOrders();
    async function loadOrders() {
      await getTodaysOrders();
    }
  }, []);

  async function cancelOrder() {
    try {
      if (selectedOrderDetails.status.status !== "canceled") {
        await updateOrderStatus(
          "canceled",
          String(selectedOrderDetails.status.statusId),
          String(selectedOrderDetails.orderId),
          "admin"
        );
      }
    } catch {
      toast.error("Não foi possível cancelar o pedido.");
    }
  }

  async function handleChangeStatus(order) {
    let statusChange: string = "";

    if (
      order.status.status === statusConfig.enum[3] ||
      order.status.status === statusConfig.enum[4]
    ) {
      statusChange = statusConfig.enum[0];
    } else {
      statusChange =
        statusConfig.enum[statusConfig.index[order.status.status] + 1];
    }

    try {
      await updateOrderStatus(
        statusChange,
        order.status.statusId,
        order.orderId
      );
    } catch {
      toast.error("Erro ao alterar status do pedido!");
    }
  }

  return (
    <Container>
      <OrdersContent>
        <BodyContent>
          <span>Pedidos</span>
          <Table>
            <TableHeader>
              <div>
                <span>Cliente</span>
              </div>
              <div>
                <span>Endereço</span>
              </div>
              <div>
                <span>Pagamento</span>
              </div>
              <div>
                <span>Status</span>
              </div>
            </TableHeader>
            <TableContent>
              {orders.map((order: any): any => (
                <TableRow
                  onClick={() => handleItemClicked(order)}
                  className={
                    selectedOrder === order.orderId ? "clickedItemStyle" : ""
                  }
                  statusColor={statusConfig.colors[order.status.status]}
                >
                  {selectedOrder === order.orderId ? <></> : <Separator />}
                  <div>
                    <div>
                      <span>{order.address.name}</span>
                    </div>
                    <div>
                      <span>
                        {order.address.street}, {order.address.number} -{" "}
                        {order.address.district}
                      </span>
                    </div>
                    <div>
                      <p>
                        {messages[order.payment.type].name} -{" "}
                        <span>
                          R$
                          {order?.total}
                        </span>
                      </p>
                    </div>
                    <div>
                      <section onClick={() => handleChangeStatus(order)}>
                        <span>{statusConfig.names[order.status.status]}</span>
                      </section>
                    </div>
                  </div>
                </TableRow>
              ))}
            </TableContent>
          </Table>
        </BodyContent>
        <DetailsOrder
          disabled={
            selectedOrderDetails?.status?.status === "canceled" ? true : false
          }
        >
          {selectedOrderDetails.hasOwnProperty("address") ? (
            <>
              <div>
                <section>
                  <span>Detalhes do pedido</span>
                  <p>
                    {formatDistance(
                      selectedOrderDetails.createdAt.seconds * 1000,
                      new Date(),
                      {
                        addSuffix: true,
                        locale: ptBR,
                      }
                    )}
                  </p>
                </section>
                <Address>
                  <span>Endereço</span>
                  <div>
                    <span>
                      {selectedOrderDetails.address.district} -{" "}
                      {selectedOrderDetails.address.street},{" "}
                      {selectedOrderDetails.address.number}
                    </span>
                    <p>{selectedOrderDetails.address.city}</p>
                    <p>
                      {selectedOrderDetails.address.name} -{" "}
                      {selectedOrderDetails.address.phone}
                    </p>
                  </div>
                </Address>
                <PaymentType>
                  <span>Forma de pagamento</span>
                  <div>
                    <span>
                      {messages[selectedOrderDetails.payment.type]?.name}
                    </span>
                    {messages[selectedOrderDetails.payment.type]?.message}
                  </div>
                </PaymentType>
                <Orders>
                  <span>Pedido</span>
                  {selectedOrderDetails.orders.map((order): any => (
                    <section>
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
                                <span key={additional.id}>
                                  {" "}
                                  {additional.amount}x
                                </span>

                                {additional.name}
                              </>
                            ))}
                        </p>
                        <div>
                          <span>R${order.orderDetails.price}</span>
                        </div>
                      </div>
                    </section>
                  ))}
                </Orders>
              </div>
              <section
                onClick={() =>
                  selectedOrderDetails.status.status !== "canceled"
                    ? cancelOrder()
                    : {}
                }
              >
                <div></div>
                <button>Cancelar</button>
              </section>
            </>
          ) : (
            <></>
          )}
        </DetailsOrder>
      </OrdersContent>
    </Container>
  );
};

export default Order;
