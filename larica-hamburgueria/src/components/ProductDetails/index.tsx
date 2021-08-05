import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import {
  IoAdd,
  IoCart,
  IoChevronBack,
  IoChevronDown,
  IoChevronForward,
  IoChevronUp,
  IoClose,
  IoPencilSharp,
  IoRemove,
} from "react-icons/io5";

import { v4 as uuidv4 } from "uuid";

import {
  Container,
  Items,
  BodyMenuProductItem,
  Separator,
  BodyMenuProductItemInformation,
  Additionals,
} from "./styles";

import hamburguerDefault from "../../assets/defaultBurguer.png";
import EmptyAdditionals from "./EmptyAdditionals";
import { toast } from "react-toastify";

interface IProps {
  item: any;
  opened: any;
  orders: any;
  setOrders: any;
}

const ProductDetails: React.FC<IProps> = ({
  item,
  orders,
  setOrders,
  opened,
}: IProps) => {
  const [productAmount, setProductAmount] = useState(1);
  const [additionals, setAdditionals] = useState([]);
  const [selectedItem, setSelectedItem]: any = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (item.hasOwnProperty("edit")) {
      setEditing(true);
      setAdditionals(item.orderDetails.additionals);
      setProductAmount(item.orderDetails.productAmount);
      setSelectedItem(item.orderDetails.item);
    } else {
      setSelectedItem(item);
      let additionalList: [] = [];
      if (item?.additionals) {
        additionalList = item.additionals.map((additional) => {
          return {
            ...additional,
            amount: 0,
          };
        });

        setAdditionals(additionalList);
      }
    }
  }, []);

  function isAbleToAdd(): boolean {
    if (productAmount >= 0 && productAmount + 1 <= selectedItem.amountAble) {
      return true;
    }
    toast.error(`Atingiu o limite de ${selectedItem.amountAble} items`);
    return false;
  }

  function isAbleToRemove(): boolean {
    return productAmount >= 2 ? true : false;
  }

  function addProduct() {
    if (isAbleToAdd()) {
      setProductAmount(productAmount + 1);
    }
  }

  function removeProduct() {
    if (isAbleToRemove()) {
      setProductAmount(productAmount - 1);
    }
  }

  function isAbleToAddAdditionals(additional: any): boolean {
    console.log(additional);
    if (
      additional.amount >= 0 &&
      additional.amount + 1 <= additional.amountAble
    ) {
      return true;
    }
    toast.error(`Não temos mais ${additional.name}`);
    return false;
  }

  function isAbleToRemoveAdditionals(amount: number): boolean {
    return amount >= 1 ? true : false;
  }

  function addAdditionals(additional: any) {
    if (isAbleToAddAdditionals(additional)) {
      const updatedAdditionals: any = additionals.map(
        (additionalToAdd: any) => {
          if (additionalToAdd.id === additional.id) {
            return {
              ...additionalToAdd,
              amount: additionalToAdd.amount + 1,
            };
          } else {
            return additionalToAdd;
          }
        }
      );

      setAdditionals(updatedAdditionals);
    }
  }

  function removeAdditionals(additional: any) {
    if (isAbleToRemoveAdditionals(additional.amount)) {
      const updatedAdditionals: any = additionals.map(
        (additionalToRemove: any) => {
          if (additionalToRemove.id === additional.id) {
            return {
              ...additionalToRemove,
              amount: additionalToRemove.amount - 1,
            };
          } else {
            return additionalToRemove;
          }
        }
      );

      setAdditionals(updatedAdditionals);
    }
  }

  function addToChart() {
    const ordersList: any = orders;
    ordersList.push({
      id: uuidv4(),
      orderDetails: {
        item: selectedItem,
        price: totalPrice,
        additionals,
        productAmount,
      },
    });

    localStorage.setItem("larica-my-orders", JSON.stringify(ordersList));
    setOrders(ordersList);
    opened(false);
  }

  function editOrder() {
    const editedOrder: [] = orders.map((order) => {
      if (order.id === item.id) {
        return {
          id: order.id,
          orderDetails: {
            item: selectedItem,
            price: Number(totalPrice),
            additionals,
            productAmount,
          },
        };
      }

      return order;
    });

    localStorage.setItem("larica-my-orders", JSON.stringify(editedOrder));
    setOrders(editedOrder);
    opened(false);
  }

  const totalPrice = useMemo(() => {
    const additionalsPrice: number = additionals.reduce(
      (accumulator: number, currentAdditional: any) => {
        return (
          accumulator +
          Number(currentAdditional.price) * Number(currentAdditional.amount)
        );
      },
      0
    );

    const productPrice: number =
      Number(selectedItem.price) * Number(productAmount);

    const total = productPrice + additionalsPrice;

    return total.toFixed(2);
  }, [additionals, productAmount, item]);

  return (
    <Container>
      <div>
        <button
          type="button"
          onClick={() => {
            opened(false);
          }}
        >
          <IoClose color="#fff" size="20" />
        </button>
        <Items>
          <BodyMenuProductItem>
            <div>
              <img
                src={
                  selectedItem.productImageUrl
                    ? selectedItem.productImageUrl
                    : hamburguerDefault
                }
                alt="Hamburguer"
              />
              <div>
                <button
                  type="button"
                  onClick={() => {
                    removeProduct();
                  }}
                >
                  <IoRemove color="#fff" size="20" />
                </button>
                <span>{productAmount}</span>
                <button
                  type="button"
                  onClick={() => {
                    addProduct();
                  }}
                >
                  <IoAdd color="#fff" size="20" />
                </button>
              </div>
            </div>
            <BodyMenuProductItemInformation>
              <div>
                <strong>{selectedItem.name}</strong>

                <span>{selectedItem.description}</span>
              </div>
            </BodyMenuProductItemInformation>
          </BodyMenuProductItem>
          <Additionals>
            <span>Adicionais</span>
            {additionals.length !== 0 ? (
              additionals.map((additional: any) => (
                <section key={additional.id}>
                  <div>
                    <span>{additional.name}</span>
                    <div>
                      <span>+ R${Number(additional.price).toFixed(2)}</span>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            removeAdditionals(additional);
                          }}
                        >
                          <IoIosRemove color="#fff" size="25" />
                        </button>
                        <span>{additional.amount}</span>
                        <button
                          type="button"
                          onClick={() => {
                            addAdditionals(additional);
                          }}
                        >
                          <IoIosAdd color="#fff" size="25" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <EmptyAdditionals />
            )}
          </Additionals>
        </Items>
        <section>
          <div>
            <span>Total</span>
            <span>R${totalPrice}</span>
          </div>
          <div
            onClick={() => {
              !editing ? addToChart() : editOrder();
            }}
          >
            <div>
              <span>{!editing ? "Adicionar" : "Modificar"}</span>
            </div>
            <div>
              {!editing ? (
                <IoCart color="#fff" size="21" />
              ) : (
                <IoPencilSharp color="#fff" size="21" />
              )}
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default ProductDetails;
