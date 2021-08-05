import { Link } from "react-scroll";
import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;

  .header-active {
    height: 70px;
    transition: all 0.5s;
  }

  .chart-review-header-active {
    top: 70px;
  }

  .chart-review {
    transition: all 0.5s;
    right: 0;
  }

  .chart-review-body {
    margin-right: 380px;
  }

  .profile-open {
    top: 10px;
    transition all 1s;
  }

  .auth-open {
    top: 10px;
    transition all 1s;
  }

  @media (max-width: 600px) {
    overflow-x: hidden;
    .profile-open {
      height: 100%;
      top: 0;
      transition all 1s;
    }

    .auth-open {
      height: 100%;
      top: 0;
      transition all 1s;
    }

    .Toastify__toast-container {
      padding: 0 10px 10px 10px;
      border-radius: 4px;
    }

    .Toastify__toast {
      margin-top: 10px;
      border-radius: 4px;
    }
  }

  .Toastify__toast-container {
    z-index: 999999999;
  }

  .Toastify__toast--success {
    background: #29ccb6;
  }
  
  .Toastify__toast--error {
    background: #c14953;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  z-index: 1000;
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
      width: 650px;

      > img {
        width: 50px;
        height: 50px;
        padding: 5px;
      }
    }
  }

  @media (max-width: 600px) {
    height: 0;
    z-index: 10000;

    > div {
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      width: 100%;
      height: 70px;
      bottom: 0;
      position: fixed;
      transition: all 0.5s;
      padding: 0 20px;
      box-shadow: 0 0px 4px rgba(39, 21, 102, 0.2);

      > a {
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;

        > img {
          width: 40px;
          height: 40px;
        }
      }
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

  @media (max-width: 600px) {
    display: none;
    align-items: center;
    background-color: #fff;
    width: 100%;
    border: 1px solid #f00;
    width: 100%;

    > input {
      display: none;
      background-color: #fff;
      font-size: 14px;
      color: #fff;
      font-weight: 400;

      ::placeholder {
        color: #fff;
        opacity: 1;
      }
    }
  }
`;

export const HeaderCart = styled.div`
  position: relative;
  cursor: pointer;
  > div {
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid #fff;
      background-color: #c14953;
      top: -10px;
      right: -12px;

      > span {
        font-size: 13px;
        font-weight: bold;
        color: #fff;
      }
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      position: relative;
      > div {
        > span {
          margin-top: -1px;
        }
      }
    }
  }
`;

export const HeaderUser = styled.div`
  cursor: pointer;
  position: relative;
  margin: 0 30px;

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  transition: all 0.8s;
  @media (max-width: 600px) {
    padding-top: 0px;
  }
`;

export const Highlights = styled.div`
  width: 100%;
  height: 500px;
  background-image: linear-gradient(-133deg, #27af9a, #29ccb6);

  @media (max-width: 600px) {
    border-bottom-left-radius: 30px;
    height: 300px;
    margin-bottom: 30px;
  }
`;

export const ChartReview = styled.div`
  top: 70px;
  bottom: 0;
  width: 380px;
  z-index: 900;
  position: fixed;
  right: -390px;
  box-shadow: 0 0 4px rgba(39, 21, 102, 0.2);
  transition: all 0.7s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: first baseline;
    position: relative;
    width: 100%;
    padding: 0;
    z-index: 1200;
    height: 100%;
    background: #fff;
  }

  @media (max-width: 600px) {
    top: 0;
    right: -100%;
    width: 100%;
  }
`;

export const Menu = styled.div`
  margin-top: 30px;
  padding: 0 20px;
  
  > section {
    display: flex;
    flex-direction: column;
    align-items: center;

    > span {
      font-weight: bold;
      font-size: 20px;
    }

    .stickBottom {
      width: 46px;
      height: 4px;
      border-radius: 2px;
      margin-top: 2px;
      background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
    }

    @media (max-width: 600px) {
      align-items: flex-start;
    }
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  > div {
    > div {
      display: flex;
      align-items: center;
      flex-direction: row;
      position: relative;
      margin-top: 25px;
      width: 100%;

      > a {
        margin-right: 20px;
      }

      > a:last-child {
        margin-right: 0;
      }
    }
  }

  @media (max-width: 600px) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    overflow-x: scroll;
    width: 320px;

    > div {
      display: flex;
      align-items: flex-start;
      flex-direction: row;
      padding: 2px 15px;
      overflow-y: hidden;
      overflow-x: scroll;

      ::-webkit-scrollbar-track {
        background-color: #fff;
      }
      ::-webkit-scrollbar {
        height: 2px;
        background: #f4f4f4;
      }
      ::-webkit-scrollbar-thumb {
        background: #dad7d7;
        border-radius: 3px;
      }

      > div {
      }
    }
  }
`;

export const OptionsItems = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  padding: 15px 10px;
  color: #27303b;
  position: relative;
  margin-bottom: 30px;
  background-color: #fff;
  width: 100px;
  box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);
  border-radius: 4px;
  transition: all 0.3s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 12px rgba(39, 21, 102, 0.3);
    color: #fff;

    > span {
      color: #fff;
    }

    > div {
      height: 100%;
      transition: all 0.5s;
      opacity: 1;
    }
  }

  &:hover > .fidown {
    background-color: #fff;
    background-image: none;

    * {
      color: #27af9a;
    }
  }

  > div {
    top: 0;
    width: 100px;
    min-height: 150px;
    background: linear-gradient(-70deg, #27af9a, #29ccb6);
    position: absolute;
    border-radius: 4px;
    opacity: 0;
  }

  > img {
    z-index: 5;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: #fff;
    object-fit: cover;
  }

  > span {
    z-index: 5;
    font-size: 13px;
    font-weight: bold;
    margin: 5px 0 8px;
  }

  > button {
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding-top: 2px;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    padding: 10px 20px;
    color: #27303b;
    position: relative;
    margin-bottom: 20px;
    background-color: #fff;
    min-width: 100px;
    box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);
    border-radius: 4px;
    transition: all 0.3s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      box-shadow: 0 2px 12px rgba(39, 21, 102, 0.3);
      color: #fff;

      > span {
        color: #fff;
      }

      > div {
        height: 100%;
        transition: all 0.5s;
        opacity: 1;
      }
    }

    &:hover > .fidown {
      background-color: #fff;
      background-image: none;

      * {
        color: #27af9a;
      }
    }

    > div {
      display: flex;
      top: 0;
      width: 100%;
      min-height: 30px;
      background: linear-gradient(-70deg, #27af9a, #29ccb6);
      position: absolute;
      border-radius: 4px;
      opacity: 0;
    }

    > img {
      display: none;
    }

    > span {
      z-index: 5;
      font-size: 13px;
      font-weight: bold;
      margin: 5px 15px;
    }

    > button {
      display: none;
    }
  }
`;

export const Items = styled.div`
  margin-top: 40px;
  transition: all 1s;

  > div {
    > div:first-child {
      .stickBottom {
        width: 46px;
        height: 4px;
        border-radius: 2px;
        margin-top: 2px;
        background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
      }

      > span {
        font-weight: bold;
        font-size: 20px;
      }
    }

    > div:last-child {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      list-style: none;
      margin: 25px 0 60px;
      transition: all 0.1s;
    }
  }

  @media (max-width: 600px) {
    > div {
      > div:last-child {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;
        list-style: none;
        margin: 25px 0 60px;
        transition: all 0.1s;
      }
    }
  }
`;

export const BodyMenuProductItem = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);

  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 12px rgba(39, 21, 102, 0.3);
  }
`;

export const BodyMenuProductItemContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  max-width: 400px;

  > img {
    min-width: 110px;
    width: 110px;
    height: 110px;
    border-radius: 4px;
    object-fit: cover;
  }
`;

export const BodyMenuProductItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 5px 0 20px;
  max-width: 400px;

  > div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    > strong {
      font-size: 15px;
      font-weight: bold;
      color: #27af9a;
    }

    > span {
      text-align: start;
      line-height: 1.4em;
      font-size: 13px;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  > strong {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 900;
  }
`;

export const BodyMenuProductItemAmount = styled.div`
  height: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34px;
  border-radius: 18px;
  justify-content: space-between;
  background-image: linear-gradient(-133deg, #27af9a, #29ccb6);

  > button {
    color: #fff;
    font-size: 18px;
    width: 34px;
    height: 34px;
    transition: all 0.3s;
    background-color: transparent;
  }

  > span {
    font-size: 16px;
    color: #fff;
  }
`;

export const Footer = styled.footer`
  margin-top: 100px;
  width: 100%;

  > div:first-child {
    background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    text-align: center;
    position: relative;
    height: 250px;

    > div:first-child {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      width: 50%;

      > div {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;

        > a {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          text-decoration: none;

          > span {
            margin-left: 5px;
            color: #fff;
            font-weight: bold;
            font-size: 13px;
          }
        }

        > a:last-child {
          margin-top: 10px;
        }
      }
    }

    > section {
      background: #fff;
      height: 30px;
      width: 1px;
      margin: 0 50px;
    }

    > div:last-child {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 50%;

      > a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        font-size: 13px;
      }

      > a:last-child {
        margin-top: 10px;
      }
    }
  }

  @media (max-width: 600px) {
    margin-top: 50px;
    width: 100%;
    margin-bottom: 70px;
    min-width: 350px;

    > div:first-child {
      background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      position: relative;
      height: 250px;

      > div:first-child {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        width: 50%;

        > div {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction: column;

          > a {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            text-decoration: none;

            > span {
              margin-left: 5px;
              color: #fff;
              font-weight: bold;
              font-size: 13px;
            }
          }

          > a:last-child {
            margin-top: 10px;
          }
        }
      }

      > section {
        background: #fff;
        width: 50px;
        height: 1px;
        margin: 20px 0;
      }

      > div:last-child {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 50%;

        > a {
          text-decoration: none;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 13px;
        }

        > a:last-child {
          margin-top: 10px;
        }
      }
    }
  }
`;

export const FooterLocation = styled.div`
  display: flex;
  flex-direction: column;

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    height: 110px;
    background-color: #27303b;
    opacity: 0.95;

    > span {
      margin-left: 5px;
      color: #f5f7f9;
      font-size: 13px;
    }
  }

  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background-color: #27303b;

    > span {
      margin-left: 10px;
      color: #f5f7f9;
      opacity: 0.6;
      font-size: 13px;
    }
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;

    > div:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      height: 110px;
      background-color: #27303b;
      opacity: 0.95;
      padding: 0 20px;

      > svg {
        width: 30px;
      }

      > span {
        margin-left: 20px;
        color: #f5f7f9;
        font-size: 13px;
      }
    }

    > div:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70px;
      background-color: #27303b;
      padding: 0 20px;

      > svg {
        width: 30px;
        margin: 5px;
      }
      > span {
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-left: 15px;
        color: #f5f7f9;
        opacity: 0.6;
        font-size: 13px;
      }
    }
  }
`;
