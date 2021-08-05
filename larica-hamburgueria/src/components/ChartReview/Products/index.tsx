import React, { useEffect, useMemo, useState } from "react";

import { Container } from "./styles";

import { Link, animateScroll as scroll } from "react-scroll";

import { IoPencilSharp, IoTrash } from "react-icons/io5";

import lanche1 from "../../../assets/lanche1.jpg";

interface IProps {
  orders: any;
  setOrders: any;
  setItemDetails: any;
  setSelectedItem: any;
}

const Products: React.FC<IProps> = ({
  orders,
  setOrders,
  setItemDetails,
  setSelectedItem,
}) => {
  function removeOrder(index: number) {
    const removedOrder = orders.filter((order) => order.id !== index);
    localStorage.setItem("larica-my-orders", JSON.stringify(removedOrder));
    setOrders(removedOrder);
  }

  function editOrder(order: any) {
    setItemDetails(true);
    setSelectedItem({ ...order, edit: true });
  }

  return (
    <Container>
      <div>
        <span>Detalhes do pedido</span>
      </div>
      {orders.map((order: any) => (
        <section key={order.id}>
          <div>
            <span>
              {order.orderDetails.item.name}{" "}
              <span>{order.orderDetails.productAmount}x</span>
            </span>
            <p>
              {order.orderDetails.additionals
                .filter((additional: any) => {
                  return additional.amount === 0 ? false : true;
                })
                .map((additional: any) => (
                  <>
                    <span key={additional.id}>{additional.amount}x</span>{" "}
                    {additional.name}
                  </>
                ))}
            </p>
            <span>R${Number(order.orderDetails.price).toFixed(2)}</span>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                editOrder(order);
              }}
            >
              <div></div>
              <IoPencilSharp color="#27af9a" size="20" />
            </button>
            <button
              type="button"
              onClick={() => {
                removeOrder(order.id);
              }}
            >
              <div></div>
              <IoTrash color="#27af9a" size="20" />
            </button>
          </div>
        </section>
      ))}
    </Container>
  );
};

export default Products;
