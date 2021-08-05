import React, { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

import { Container } from "./styles";

interface IProps {
  setProfileView: any;
  setUserSettingsView: any;
  setMyOrdersView: any;
}

const ProfileMenu: React.FC<IProps> = ({
  setMyOrdersView,
  setUserSettingsView,
  setProfileView,
}) => {
  const { currentUser, logout }: any = useAuth();

  useEffect(() => {
    setUserSettingsView(false);
    setMyOrdersView(false);
  }, []);

  return (
    <Container>
      <div></div>
      <span>Bem-vindo,</span>
      <h2>{currentUser?.name}</h2>
      <button
        onClick={() => {
          setUserSettingsView(true);
        }}
      >
        <span>Perfil</span>
      </button>
      {!currentUser?.admin ? (
        <button
          onClick={() => {
            setMyOrdersView(true);
          }}
        >
          <span>Meus pedidos</span>
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <span>Ecommerce</span>
          </button>
        </>
      )}
      <button
        onClick={() => {
          setProfileView(false);
          logout();
        }}
      >
        <span>Trocar de conta</span>
      </button>
    </Container>
  );
};

export default ProfileMenu;
