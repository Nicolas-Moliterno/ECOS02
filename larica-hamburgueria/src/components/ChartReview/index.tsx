import React, { useCallback, useEffect, useMemo, useState } from "react";
import Payments from "./Payments";
import Products from "./Products";
import Shipping from "./Shipping";
import { Container, Cart } from "./styles";

import { IoCart, IoSend } from "react-icons/io5";
import EmptyCart from "./EmptyCart";
import Finish from "./Finish";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import CanceledOrder from "./CanceledOrder";

interface IProps {
  orders: any;
  setOrders: any;
  setItemDetails: any;
  setSelectedItem: any;
  address: any;
  setAddress: any;
  paymentType: any;
  setPaymentType: any;
}

const Review: React.FC<IProps> = ({
  orders,
  setOrders,
  setItemDetails,
  setSelectedItem,
  address,
  setAddress,
  paymentType,
  setPaymentType,
}: IProps) => {
  const [editAddress, setEditAddress] = useState(false);
  const [buy, setBuy] = useState(false);
  const [cancelable, setCancelable] = useState(true);

  const { saveOrder, getStatusById }: any = useAuth();

  useEffect(() => {
    const localOrderStatusId: any = localStorage.getItem("order-status-id");

    loadOrder();

    async function loadOrder() {
      if (localOrderStatusId) {
        const retrievedOrderStatus: any = JSON.parse(localOrderStatusId);
        setBuy(true);
        try {
          await getStatusById(retrievedOrderStatus.statusId);
        } catch {
          toast.error("Erro ao mostrar status do pedido.");
        }
      }
    }
  }, []);

  async function handleBuy() {
    if (!address.hasOwnProperty("default")) {
      const finished = {
        address,
        payment: paymentType,
        orders,
        total: orders
          .reduce((accumulator: number, currentOrder: any) => {
            return accumulator + Number(currentOrder.orderDetails.price);
          }, 0)
          .toFixed(2),
      };

      try {
        const order = await saveOrder(finished);

        localStorage.removeItem("larica-my-orders");
        localStorage.removeItem("order-status-id");
        localStorage.setItem(
          "order-status-id",
          JSON.stringify({ ...order, orderDate: new Date() })
        );
        setOrders([]);
        setBuy(true);
      } catch (err) {
        toast.error("Não foi possivel realizar seu pedido!");
      }
    } else {
      const doc: any = document.getElementById("cart-review");
      doc.scrollTop = 0;
      setEditAddress(true);
      toast.error("Coloca aí, seu endereço pra receber!");
    }
  }

  return (
    <Container>
      {orders.length === 0 ? (
        !buy ? (
          <EmptyCart />
        ) : (
          <Finish
            cancelable={cancelable}
            setCancelable={setCancelable}
            setBuy={setBuy}
          />
        )
      ) : (
        <Cart id="cart-review">
          <div>
            <Shipping
              address={address}
              setAddress={setAddress}
              editAddress={editAddress}
              setEditAddress={setEditAddress}
            />
            <Payments
              paymentType={paymentType}
              setPaymentType={setPaymentType}
            />
            <Products
              setItemDetails={setItemDetails}
              setSelectedItem={setSelectedItem}
              orders={orders}
              setOrders={setOrders}
            />
          </div>
          <section>
            <div>
              <div />
            </div>

            <div>
              <div>
                <span>Total</span>
                <span>
                  R$
                  {orders
                    .reduce((accumulator, currentOrder: any) => {
                      return (
                        accumulator + Number(currentOrder.orderDetails.price)
                      );
                    }, 0)
                    .toFixed(2)}
                </span>
              </div>

              <div
                onClick={() => {
                  handleBuy();
                }}
              >
                <div>
                  <span>Comprar</span>
                </div>
                <div>
                  <IoCart color="#fff" size="21" />
                </div>
              </div>
            </div>
          </section>
        </Cart>
      )}
    </Container>
  );
};

export default Review;
