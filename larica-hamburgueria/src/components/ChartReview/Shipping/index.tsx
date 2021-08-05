import React, { useEffect, useState } from "react";

import { Container } from "./styles";

import { Link, animateScroll as scroll } from "react-scroll";

import { IoClose, IoPencilSharp } from "react-icons/io5";
import ChangeAddress from "./ChangeAddress";
import { useAuth } from "../../../context/AuthContext";

interface IProps {
  address: any;
  setAddress: any;
  editAddress: any;
  setEditAddress: any;
}

const Shipping: React.FC<IProps> = ({
  address,
  setAddress,
  editAddress,
  setEditAddress,
}) => {
  const { currentUser }: any = useAuth();

  useEffect(() => {
    if (currentUser) {
      const userAddress = currentUser.address;
      if (userAddress) {
        console.log(1)
        setAddress(userAddress);
      } else {
        console.log(2)
        chooseAddress();
      }
    } else {
      console.log(3)
      chooseAddress();
    }
  }, [currentUser]);

  function chooseAddress() {
    const addressStorage: any = localStorage.getItem("larica-my-address");

    if (addressStorage) {
      setAddress(JSON.parse(addressStorage));
    } else {
      const defaultAddress: any = {
        default: true,
        name: "Larica",
        phone: "12997100179",
        district: "Parque Primavera",
        street: "Av. Antônio Marota",
        number: "550",
        city: "Cachoeira Paulista",
        apartment: "",
      };
      setAddress(defaultAddress);
    }
  }

  function isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  return (
    <Container>
      <div>
        <span>Detalhes do envio</span>
      </div>
      <div>
        <div>
          <div>
            <span>
              {address.district} - {address.street}, {address.number}
            </span>
            <p>
              {address.city}
              {address.apartment ? `, ${address.apartment}` : ""}
            </p>
            <p>
              {address.name} - {address.phone}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditAddress(!editAddress);
            }}
          >
            <div></div>
            {editAddress ? (
              <IoClose color="#27af9a" size="20" />
            ) : (
              <IoPencilSharp color="#27af9a" size="20" />
            )}
          </button>
        </div>
        <ChangeAddress
          editAddress={editAddress}
          setEditAddress={setEditAddress}
          address={address}
          setAddress={setAddress}
        />
      </div>
    </Container>
  );
};

export default Shipping;
