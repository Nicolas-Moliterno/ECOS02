import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding-right: 320px;
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

interface IProps {
  statusColor: any;
}

export const TableRow = styled.div<IProps>`
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
      > p {
        font-weight: bold;
        font-size: 13px;
        > span {
          font-weight: 900;
          font-size: 13px;
          color: #27af9a;
        }
      }

      > section {
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${(props) => props.statusColor.hex + "40"};
        height: 32px;
        width: 125px;
        padding: 0 25px;
        border-radius: 16px;
        box-shadow: 0 0 0 0 ${(props) => props.statusColor.hex + "40"};
        transform: scale(1);
        animation: ${(props) =>
            props.statusColor.hex === "#FF6B6B" ? "pulse" : ""}
          2s infinite;
        cursor: pointer;

        > span {
          font-weight: bold;
          font-size: 13px;
          color: ${(props) => props.statusColor.hex};
          opacity: 1;
        }
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 #ffdada;
        }

        70% {
          transform: scale(1);
          box-shadow: 0 0 0 13px #ffdada00;
        }

        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 #ffdada00;
        }
      }
    }
  }
`;

interface IPropsDetails {
  disabled?: boolean;
}

export const DetailsOrder = styled.div<IPropsDetails>`
  top: 70px;
  width: 320px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: #f4f2fa;

  > div {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 170px;
    padding: 40px 40px 0px 40px;
    bottom: 100px;
    // margin-bottom: 100px;
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar-track {
      background-color: #f4f2fa;
    }
    ::-webkit-scrollbar {
      width: 6px;
      background: #f4f2fa;
    }
    ::-webkit-scrollbar-thumb {
      background: #d5d0e2;
      border-radius: 3px;
    }

    > section {
      display: flex;
      flex-direction: column;
      padding-bottom: 40px;

      > span {
        font-size: 16px;
        font-weight: bold;
      }

      > p {
        font-size: 12px;
        color: #a0a0a0;
        margin-top: 5px;
      }
    }
  }

  > section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 320px;
    padding: 0 30px;
    background: #f4f2fa;

    > button:last-child {
      border-radius: 4px;
      background: ${(props) => (props.disabled ? "#c14953B3" : "#c14953")};
      color: #fff;
      font-weight: bold;
      font-size: 13px;
      height: 44px;
      width: 100%;
      cursor: ${(props) => (props.disabled ? "default" : "pointer")};
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

export const Separator = styled.section`
  height: 1px;
  width: 100%;
  margin: 0 25px;
  margin-top: -2px;
  border-bottom: 2px solid #f4f2fa;
`;
