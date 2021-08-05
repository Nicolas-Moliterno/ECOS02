import { Link } from "react-scroll";
import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  z-index: 100000;
  height: 70px;
  position: fixed;
  transition: all 0.5s;
  box-shadow: 0 0px 4px rgba(39, 21, 102, 0.2);

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 1000px;

    > a {
      cursor: pointer;

      > img {
        width: 50px;
        height: 50px;
        padding: 5px;
      }
    }

    > div {
      display: flex;
      align-items: center;
    }
  }
`;

export const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 12px;
  background-color: #eee;
  border-radius: 4px;
  margin-right: 25px;

  > input {
    margin-left: 10px;
    width: 150px;
    background-color: #eee;
    font-size: 14px;
    color: #a0a0a0;
    font-weight: 400;

    ::placeholder {
      color: #a0a0a0;
      opacity: 1;
    }
  }
`;

export const HeaderCart = styled.div`
  position: relative;
  cursor: pointer;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #c14953;
    background-color: #c14953;
    top: -13px;
    right: -15px;

    > span {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
    }
  }
`;

export const HeaderUser = styled.div`
  cursor: pointer;
  position: relative;
  margin-right: 20px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 270px;
  padding-top: 70px;
  height: 100%;
`;

export const AccountStatistics = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 100%;
  z-index: 900;
  position: fixed;
  right: 0;
  top: 70px;
  left: 270px;
  padding-left: 25px;
  background: #fff;
  border-radius: 1px;
  border-bottom: 2px solid #f4f2fa;

  > div {
    display: flex;
    align-items: center;
    height: 100px;
    margin-right: 60px;

    > img {
      width: 50px;
      height: 50px;
      background: #143642;
      margin-right: 10px;
      padding: 12px;
      border-radius: 20px;
    }

    > div {
      > p {
        font-size: 13px;
        color: #a0a0a0;
      }

      > span {
        font-size: 16px;
        font-weight: 900;
      }
    }
  }
`;

export const OrdersContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 100px;
`;

export const BodyContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > span {
    font-size: 16px;
    font-weight: bold;
    padding: 40px 0 40px 25px;
  }
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    width: 100%;
    padding: 0 0 15px 25px;

    > span {
      font-weight: bold;
      font-size: 13px;
    }
  }
`;

export const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .clickedItemStyle {
    background: #f4f2fa;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: flex-start;
      width: 100%;
      padding: 15px 0 15px 25px;

      > span {
        font-weight: bold;
        font-size: 13px;
      }

      > section {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(240, 208, 239);
        height: 32px;
        padding: 0 25px;
        border-radius: 16px;
        box-shadow: 0 0 0 0 rgba(240, 208, 239, 1);
        transform: scale(1);
        animation: pulse 2s infinite;
        cursor: pointer;

        > span {
          font-weight: bold;
          font-size: 13px;
          color: #cf68cc;
          opacity: 1;
        }
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(240, 208, 239, 0.7);
        }

        70% {
          transform: scale(1);
          box-shadow: 0 0 0 13px rgba(240, 208, 239, 0);
        }

        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(240, 208, 239, 0);
        }
      }
    }
  }
`;

export const DetailsOrder = styled.div`
  top: 70px;
  width: 440px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: #f4f2fa;

  > span {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 40px;
  }

  > section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 345px;
    padding: 0 30px;
    margin-left: -40px;
    background: #f4f2fa;

    > button:last-child {
      border-radius: 4px;
      background: #c14953;
      color: #fff;
      font-weight: bold;
      font-size: 13px;
      height: 44px;
      width: 100%;
    }
  }
`;

export const Address = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;

  > span {
    font-weight: 900;
    font-size: 14px;
    margin-bottom: 13px;
  }

  > div {
    display: flex;
    flex-direction: column;

    > span {
      font-size: 13px;
      font-weight: bold;
    }

    > p {
      font-size: 13px;
      color: #a0a0a0;
    }
  }
`;

export const PaymentType = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;

  > span {
    font-weight: 900;
    font-size: 14px;
    margin-bottom: 15px;
  }

  > div {
    display: flex;
    flex-direction: column;

    > span {
      font-size: 13px;
      font-weight: bold;
    }

    > p {
      font-size: 13px;
      color: #a0a0a0;

      > span {
        font-size: 13px;
        font-weight: 900;
        margin: 0 3px;
        color: #27303b;
      }
    }
  }
`;

export const Orders = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-weight: 900;
    font-size: 14px;
    margin-bottom: 15px;
  }

  > section {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      > span:first-child {
        font-size: 13px;
        font-weight: bold;

        > span {
          color: #27303b;
          font-size: 13px;
          font-weight: 900;
          margin: 0 3px;
        }
      }

      > div {
        background: #d5d0e2;
        padding: 0 20px;
        height: 30px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0 25px 0;
        > span {
          color: #27303b;
          font-size: 13px;
          font-weight: 900;
        }
      }

      > p {
        font-size: 13px;
        color: #a0a0a0;

        > span {
          color: #27303b;
          font-size: 13px;
          font-weight: 900;
          margin: 0 3px;
        }
      }
    }
  }
`;

// ############  MENUUUUUUUUUUUU  ##############
// ############  MENUUUUUUUUUUUU  ##############
// ############  MENUUUUUUUUUUUU  ##############
// ############  MENUUUUUUUUUUUU  ##############
// ############  MENUUUUUUUUUUUU  ##############

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 100px;
`;

export const BodyMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > span {
    font-size: 16px;
    font-weight: bold;
    padding: 40px 0 40px 25px;
  }
`;

export const ProductsType = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;

  > span {
    font-weight: bold;
    font-size: 13px;
  }

  > div {
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: scroll;
    max-width: 800px;
    padding-bottom: 10px;

    ::-webkit-scrollbar-track {
      background-color: #fff;
    }
    ::-webkit-scrollbar {
      height: 6px;
      background: #f4f2fa;
    }
    ::-webkit-scrollbar-thumb {
      background: #dad7d7;
      border-radius: 3px;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f4f2fa;
      height: 32px;
      padding: 0 25px;
      border-radius: 16px;
      margin-top: 10px;
      margin-right: 10px;

      > span {
        font-weight: bold;
        font-size: 13px;
        color: #27303b;
        opacity: 1;
      }
    }
  }
`;

export const ProductsList = styled.div``;

export const TableProducts = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableProductsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    width: 100%;
    padding: 15px 0 15px 25px;

    > span {
      font-weight: bold;
      font-size: 13px;
    }
  }
`;

export const TableProductsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .clickedItemStyle {
    background: #f4f2fa;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
`;

export const TableProductsRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: flex-start;
      width: 100%;
      padding: 15px 0 15px 25px;

      > span {
        font-weight: bold;
        font-size: 13px;
      }

      > section {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(240, 208, 239);
        height: 32px;
        padding: 0 25px;
        border-radius: 16px;
        box-shadow: 0 0 0 0 rgba(240, 208, 239, 1);
        transform: scale(1);
        animation: pulse 2s infinite;
        cursor: pointer;

        > span {
          font-weight: bold;
          font-size: 13px;
          color: #cf68cc;
          opacity: 1;
        }
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(240, 208, 239, 0.7);
        }

        70% {
          transform: scale(1);
          box-shadow: 0 0 0 13px rgba(240, 208, 239, 0);
        }

        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(240, 208, 239, 0);
        }
      }
    }
  }
`;

export const DetailsProducts = styled.div`
  top: 70px;
  min-width: 342px;
  max-width: 342px;
  display: flex;
  flex-direction: column;
  padding: 40px 40px 100px 40px ;
  background: #f4f2fa;

  > span {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 40px;
  }

  > form {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      flex-direction: column;

      > span {
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      > div {
        margin-bottom: 20px;

        > button {
          margin-top: 10px;
          border-radius: 4px;
          background: #27af9a;
          color: #fff;
          font-weight: bold;
          font-size: 13px;
          height: 44px;
          width: 100%;
        }
      }
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    height: 100px;
    min-width: 342px;
    max-width: 342px;
    padding: 0 30px;
    margin-left: -40px;
    background: #f4f2fa;

    > button:first-child {
      border-radius: 4px;
      background: #27af9a;
      color: #fff;
      font-weight: bold;
      font-size: 13px;
      height: 44px;
      width: 130px;
    }

    > button:last-child {
      border-radius: 4px;
      background: #c14953;
      color: #fff;
      font-weight: bold;
      font-size: 13px;
      height: 44px;
      width: 130px;
    }
  }
`;

export const AdditionalsList = styled.div`
  display: block;
  flex-direction: column;
  padding: 0 30px;
  margin-top: 20px;

  > span {
    font-size: 14px;
    font-weight: 900;
    padding-bottom: 10px;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    margin-top: 20px;

    > span {
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    > button {
      margin-top: 10px;
      border-radius: 4px;
      background: #c14953;
      color: #fff;
      font-weight: bold;
      font-size: 13px;
      height: 44px;
      width: 100%;
    }
  }
`;

export const Suport = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 200px;

  > span {
    font-size: 30px;
    font-weight: bold;
  }

  > p {
    font-size: 1px;
  }
`;

export const SideMenu = styled.div`
  top: 70px;
  bottom: 0;
  width: 240px;
  z-index: 10000;
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  background: #fff;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    padding: 0 70px;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .clickMenuButton {
    background: #f5faf9;

    > div {
      background: #27af9a;
    }

    > span {
      color: #27af9a;
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    padding: 12px 70px;
    cursor: pointer;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 33px;
      height: 33px;
      border-radius: 14px;
      background: #eee;
    }

    > span {
      font-size: 13px;
      margin-left: 15px;
      color: #27303b;
    }
  }
`;

export const LeftBar = styled.section`
  width: 5px;
  background: #27af9a;
  height: 57px;
  position: absolute;
  left: 0;
`;

export const Separator = styled.section`
  height: 1px;
  width: 100%;
  margin: 0 25px;
  margin-top: -2px;
  border-bottom: 2px solid #f4f2fa;
`;
