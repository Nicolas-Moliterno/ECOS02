import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  IoBagHandle,
  IoSearch,
  IoPersonCircle,
  IoPersonCircleOutline,
  IoAlbums,
  IoHeadset,
  IoPodium,
  IoCar,
} from "react-icons/io5";

import "aos/dist/aos.css";

import {
  Container,
  Header,
  HeaderSearch,
  HeaderUser,
  Body,
  AccountStatistics,
  SideMenu,
  MenuList,
  LeftBar,
} from "./styles";

import logo from "../../assets/logo.svg";

import { Link, animateScroll as scroll } from "react-scroll";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../../components/Profile";
import Order from "../../components/Dashboard/Order";
import Menu from "../../components/Dashboard/Menu";
import Suport from "../../components/Dashboard/Suport";
import Pontuation from "../../components/Dashboard/Pontuation";
import Delivery from "../../components/Dashboard/Delivery";

import { useAuth } from "../../context/AuthContext";
import { Redirect } from "react-router";
import wallet from "../../assets/wallet.svg";
import shoppingBag from "../../assets/shopping-bag.svg";
import { toast, ToastContainer } from "react-toastify";

const Dashboard: React.FC = () => {
  const [profileView, setProfileView] = useState(false);
  const [clickOrder, setClickOrder] = useState(true);
  const [clickMenu, setClickMenu] = useState(false);
  const [clickSuport, setClickSuport] = useState(false);
  const [clickPontuation, setClickPontuation] = useState(false);
  const [clickDelivery, setClickDelivery] = useState(false);
  const [statistics, setStatistics] = useState<any>({});
  const [orders, setOrders] = useState<any>([]);

  const { getOrders }: any = useAuth();

  const { currentUser }: any = useAuth();
  function handleAuthAndProfileViews() {
    if (currentUser) {
      setProfileView(!profileView);
    } else {
      <Redirect to="/" />;
    }
  }

  useEffect(() => {
    loadOrders();

    async function loadOrders() {
      try {
        const response = await getOrders();

        let retrievedOrders: any = [];
        response.forEach((element): any => {
          console.log(element.data());
          retrievedOrders.push(element.data());
        });

        setOrders(retrievedOrders);
      } catch {
        toast.error("Falha ao carregar valores!");
      }
    }
  }, []);

  function menuClick(button: any) {
    setClickOrder(false);
    setClickMenu(false);
    setClickSuport(false);
    setClickPontuation(false);
    setClickDelivery(false);

    const click: any = {
      order: () => setClickOrder(true),
      menu: () => setClickMenu(true),
      suport: () => setClickSuport(true),
      pontuation: () => setClickPontuation(true),
      delivery: () => setClickDelivery(true),
    };

    return click[button]();
  }

  return (
    <>
      <Container>
        <ToastContainer
          style={{ marginTop: "85px" }}
          toastStyle={{ background: "#c14953" }}
        />
        <Header>
          <div>
            <Link
              to=""
              onClick={() => {
                scroll.scrollToTop();
              }}
            >
              <img src={logo} alt="Larica"></img>
            </Link>
            <div>
              <HeaderSearch>
                <IoSearch color="#a0a0a0" size="22"></IoSearch>
                <input type="search" placeholder="Procurar" />
              </HeaderSearch>
              <HeaderUser>
                {currentUser ? (
                  <IoPersonCircle
                    onClick={() => {
                      handleAuthAndProfileViews();
                    }}
                    color="#27af9a"
                    size="35"
                  />
                ) : (
                  <IoPersonCircleOutline
                    onClick={() => {
                      handleAuthAndProfileViews();
                    }}
                    color="#27af9a"
                    size="35"
                  />
                )}

                <Profile
                  profileView={profileView}
                  setProfileView={setProfileView}
                />
              </HeaderUser>
            </div>
          </div>
        </Header>
        <SideMenu>
          <MenuList>
            <span>MENU</span>
            <div
              className={clickOrder ? "clickMenuButton" : ""}
              onClick={() => menuClick("order")}
            >
              {clickOrder ? <LeftBar /> : <></>}
              <div>
                <IoBagHandle
                  size="20"
                  color={clickOrder ? "#fff" : "#434d59"}
                />
              </div>
              <span>Pedidos</span>
            </div>
            <div
              className={clickMenu ? "clickMenuButton" : ""}
              onClick={() => menuClick("menu")}
            >
              {clickMenu ? <LeftBar /> : <></>}
              <div>
                <IoAlbums size="20" color={clickMenu ? "#fff" : "#434d59"} />
              </div>
              <span>Menu</span>
            </div>
            <div
              className={clickSuport ? "clickMenuButton" : ""}
              onClick={() => menuClick("suport")}
            >
              {clickSuport ? <LeftBar /> : <></>}
              <div>
                <IoHeadset size="20" color={clickSuport ? "#fff" : "#434d59"} />
              </div>
              <span>Suporte</span>
            </div>
            <div
              className={clickPontuation ? "clickMenuButton" : ""}
              onClick={() => menuClick("pontuation")}
            >
              {clickPontuation ? <LeftBar /> : <></>}
              <div>
                <IoPodium size="20" color={clickPontuation ? "#fff" : "#434d59"} />
              </div>
              <span>Pontuation</span>
            </div>
            <div
              className={clickDelivery ? "clickMenuButton" : ""}
              onClick={() => menuClick("delivery")}
            >
              {clickDelivery ? <LeftBar /> : <></>}
              <div>
                <IoCar size="20" color={clickDelivery ? "#fff" : "#434d59"} />
              </div>
              <span>Delivery</span>
            </div>
          </MenuList>
        </SideMenu>
        <Body>
          <AccountStatistics>
            <div>
              <img src={wallet} alt="" />
              <div>
                <p>Saldo total</p>
                <span>
                  R$
                  {orders
                    .reduce((accumulator: number, currentOrder: any) => {
                      return accumulator + Number(currentOrder.total);
                    }, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
            <div>
              <img style={{ background: "#5EC2B7" }} src={shoppingBag} alt="" />
              <div>
                <p>Total de pedidos</p>
                <span>
                  {orders
                    .reduce((accumulator: number) => {
                      return accumulator + 1;
                    }, 0)
                    .toFixed(0)}
                </span>
              </div>
            </div>
          </AccountStatistics>
          {clickOrder ? <Order /> : <></>}
          {clickMenu ? <Menu /> : <></>}
          {clickSuport ? <Suport /> : <></>}
          {clickPontuation ? <Pontuation /> : <></>}
          {clickDelivery ? <Delivery /> : <></>}
        </Body>
      </Container>
    </>
  );
};

export default Dashboard;
