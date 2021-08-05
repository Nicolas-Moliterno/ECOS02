import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { FiChevronDown } from "react-icons/fi";
import {
  IoBagHandle,
  IoSearch,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLocationSharp,
  IoPersonCircle,
  IoPersonCircleOutline,
} from "react-icons/io5";

import { FaCopyright } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

import {
  Container,
  Header,
  Body,
  Highlights,
  Menu,
  Options,
  Items,
  Footer,
  FooterLocation,
  BodyMenuProductItem,
  BodyMenuProductItemContent,
  BodyMenuProductItemInformation,
  ChartReview,
  OptionsItems,
  HeaderCart,
  HeaderSearch,
  HeaderUser,
} from "./styles";

import ContentLoader from "react-content-loader";
import logo from "../../assets/logo.svg";

import Review from "../../components/ChartReview";
import ProductDetails from "../../components/ProductDetails";

import { Link, animateScroll as scroll } from "react-scroll";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authentication from "../../components/Authentication";
import Profile from "../../components/Profile";
import hamburguerDefault from "../../assets/defaultBurguer.png";

import { useAuth } from "../../context/AuthContext";
import { addHours, compareAsc } from "date-fns";

const Ecommerce: React.FC = () => {
  const [chartReview, setChartReview] = useState(false);
  const [itemDetails, setItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({});
  const [chartReviewStyle, setChartReviewStyle] = useState("");
  const [paymentType, setPaymentType] = useState({});
  const [menuOptions, setMenuOptions] = useState({});
  const [products, setProducts] = useState<any>([]);
  const [signInView, setSignInView] = useState(false);
  const [signUpView, setSignUpView] = useState(false);
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [resetPasswordView, setResetPasswordView] = useState(false);
  const [profileView, setProfileView] = useState(false);
  const { getProducts, getMenuItems }: any = useAuth();

  useEffect(() => {
    AOS.init();

    const localOrderStatusId: any = localStorage.getItem("order-status-id");

    if (localOrderStatusId) {
      const retrievedOrderStatus: any = JSON.parse(localOrderStatusId);
      const orderDatePlusFiveHours = addHours(
        new Date(retrievedOrderStatus.orderDate),
        5
      );

      if (compareAsc(orderDatePlusFiveHours, new Date()) === -1) {
        localStorage.removeItem("order-status-id");
      }
    }
    setPaymentType({
      type: "money",
      change: 0,
    });

    setMenuOptions({});

    chooseOrders();

    choosePaymentType();

    loadProducts();
    async function loadProducts() {
      try {
        const response = await getProducts();
        const responseProductsType = await getMenuItems();

        let retrievedProducts: any = [];
        response.forEach((element): any => {
          retrievedProducts.push(element.data());
        });

        let retrievedProductsType: any = [];
        responseProductsType.forEach((element): any => {
          retrievedProductsType.push(element.data());
        });

        setProducts(
          normalizeProducts(retrievedProducts, retrievedProductsType)
        );
      } catch (err) {
        toast.error("Falha ao carregar os produtos!");
        console.log(err);
      }
    }
  }, []);

  function normalizeProducts(retrievedProducts, retrievedProductsType) {
    // Criamos um objeto que vai armazenar o número de cada objeto.
    const separateProductsType: any = {};

    retrievedProducts.map((obj): any => {
      if (separateProductsType[obj.type]) {
        separateProductsType[obj.type].push(obj);
      } else {
        separateProductsType[obj.type] = [];
        separateProductsType[obj.type].push(obj);
      }
    });

    const separatedProducts = Object.entries(separateProductsType);

    const normalizedProducts: any = [];
    separatedProducts.forEach(([key, value]): any => {
      const productType = retrievedProductsType.find((item) => {
        return item.type === key;
      });

      if (productType?.order) {
        normalizedProducts.push({
          type: key,
          order: productType.order,
          active: productType.active,
          items: value,
        });
      }
    });

    normalizedProducts.sort(function (a, b) {
      return a.order > b.order ? 1 : b.order > a.order ? -1 : 0;
    });

    return normalizedProducts
      .map((items: any) => {
        const filteredItems = items.items.filter((product: any) => {
          return product.active;
        });

        return {
          ...items,
          items: filteredItems,
        };
      })
      .filter((item: any) => {
        return item.active;
      });
  }

  function chooseOrders() {
    const ordersStorage: any = localStorage.getItem("larica-my-orders");

    if (ordersStorage) {
      setOrders(JSON.parse(ordersStorage));
    }
  }

  function choosePaymentType() {
    const paymentTypeStorage: any = localStorage.getItem(
      "larica-my-payment-type"
    );

    if (paymentTypeStorage) {
      setPaymentType(JSON.parse(paymentTypeStorage));
    }
  }

  const viewItemDetails = (item: any) => {
    setItemDetails(true);
    setSelectedItem(item);
  };

  const { currentUser }: any = useAuth();

  function handleAuthAndProfileViews() {
    if (currentUser) {
      setProfileView(!profileView);
    } else {
      setSignInView(!signInView);
    }
  }

  return (
    <>
      <Container>
        <ToastContainer />

        {currentUser ? (
          <Profile
            profileView={profileView}
            setProfileView={setProfileView}
            setChartReview={setChartReview}
            setOrders={setOrders}
            setAddress={setAddress}
            setPaymentType={setPaymentType}
          />
        ) : (
          <Authentication
            setSignUpView={setSignUpView}
            setSignInView={setSignInView}
            signUpView={signUpView}
            signInView={signInView}
            forgotPasswordView={forgotPasswordView}
            setForgotPasswordView={setForgotPasswordView}
            resetPasswordView={resetPasswordView}
            setResetPasswordView={setResetPasswordView}
          />
        )}

        <Header>
          <div>
            <Link
              to=""
              onClick={() => {
                setSignInView(false);
                setProfileView(false);
                setChartReview(false);
                scroll.scrollToTop();
              }}
            >
              <img src={logo} alt="Larica"></img>
            </Link>
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
            </HeaderUser>
            <HeaderCart
              onClick={() => {
                profileView || signInView
                  ? setChartReview(true)
                  : setChartReview(!chartReview);
                setProfileView(false);
                setSignInView(false);
              }}
            >
              <div>
                <IoBagHandle color="#27af9a" size="30" />
                {orders.length !== 0 ? (
                  <div>
                    <span>{orders.length}</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </HeaderCart>
          </div>
        </Header>

        <Body className={chartReview ? "chart-review-body" : ""}>
          {itemDetails ? (
            <ProductDetails
              item={selectedItem}
              orders={orders}
              setOrders={setOrders}
              opened={setItemDetails}
            />
          ) : (
            <></>
          )}

          <ChartReview
            className={
              chartReview
                ? `chart-review ${chartReviewStyle}`
                : chartReviewStyle
            }
          >
            <div>
              <Review
                setItemDetails={setItemDetails}
                setSelectedItem={setSelectedItem}
                orders={orders}
                setOrders={setOrders}
                address={address}
                setAddress={setAddress}
                paymentType={paymentType}
                setPaymentType={setPaymentType}
              />
            </div>
          </ChartReview>
          <Highlights />
          <Menu>
            <section>
              <span>Nossos Menus</span>
              <div className="stickBottom"></div>
            </section>
            <Options>
              <div>
                {products.length > 0 ? (
                  <div>
                    {products.map((product) => (
                      <OptionsItems
                        to={product.type.toLowerCase()}
                        activeClass="active"
                        spy={true}
                        smooth={true}
                        offset={-90}
                        duration={500}
                      >
                        <img src={hamburguerDefault} alt="" />
                        <span>{product.type}</span>
                        <button className="fidown">
                          <FiChevronDown color="#fff" size="19"></FiChevronDown>
                        </button>
                        <div></div>
                      </OptionsItems>
                    ))}
                  </div>
                ) : (
                  <ContentLoader
                    speed={1.5}
                    width={400}
                    height={160}
                    viewBox="0 0 50 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <circle cx="25" cy="25" r="25" />
                    <rect x="0" y="72" rx="3" ry="3" width="50" height="20" />
                  </ContentLoader>
                )}
              </div>
            </Options>

            <Items className={"hideItems"}>
              {products.length > 0 ? (
                <>
                  {products.map((product) => (
                    <div id={product.type.toLowerCase()}>
                      <div>
                        <span>{product.type}</span>
                        <div className="stickBottom"></div>
                      </div>

                      <div>
                        {product.items.map((item) => (
                          <BodyMenuProductItem
                            onClick={() => {
                              viewItemDetails(item);
                            }}
                          >
                            <BodyMenuProductItemContent>
                              <img
                                src={
                                  item.productImageUrl
                                    ? item.productImageUrl
                                    : hamburguerDefault
                                }
                                alt="Hamburguer"
                              />

                              <BodyMenuProductItemInformation>
                                <div>
                                  <strong>{item.name}</strong>

                                  <span>{item.description}</span>
                                </div>
                                <strong>
                                  R${Number(item.price).toFixed(2)}
                                </strong>
                              </BodyMenuProductItemInformation>
                            </BodyMenuProductItemContent>
                          </BodyMenuProductItem>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <ContentLoader
                  speed={1.5}
                  width={700}
                  height={160}
                  viewBox="0 0 700 160"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="4" ry="4" width="80" height="25" />
                  <rect x="0" y="70" rx="4" ry="4" width="90" height="90" />
                  <rect x="110" y="80" rx="3" ry="3" width="120" height="20" />
                  <rect x="110" y="110" rx="3" ry="3" width="240" height="20" />

                  <rect x="400" y="70" rx="4" ry="4" width="90" height="90" />
                  <rect x="510" y="80" rx="3" ry="3" width="120" height="20" />
                  <rect x="510" y="110" rx="3" ry="3" width="240" height="20" />
                </ContentLoader>
              )}
            </Items>
          </Menu>
          <Footer>
            <div>
              <div>
                <div>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IoLogoInstagram color="#fff" size="30" />
                    <span>@ProjetoECOS02</span>
                  </a>

                  <a
                    href="https://wa.me/c/5512992157858"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IoLogoWhatsapp color="#fff" size="30" />
                    <span>(DDD) 18888-9999</span>
                  </a>
                </div>
              </div>

              <section />

              <div>
                <a>Termos de uso</a>
                <a>Privacidade</a>
              </div>
            </div>
            <FooterLocation>
              <div>
                <IoLocationSharp color="#fff" size="30" />
                <span>
                  Av. BPS, Itajubá, Minas Gerais.
                </span>
              </div>
              <div>
                <FaCopyright fill="#f5f7f9" size="20" opacity="0.6" />
                <span>
                  Copyright 2021 - Projeto ECOS02 - Todos os direitos
                  reservados
                </span>
              </div>
            </FooterLocation>
          </Footer>
        </Body>
      </Container>
    </>
  );
};

export default Ecommerce;
