import styled from "styled-components";

export const Container = styled.div`
  z-index: 900;
  position: fixed;
  transition: all 0.7s;
  display: flex;
  width: 100%;
  bottom: 0;
  top: 70px;
  align-items: center;
  justify-content: center;
  background: rgba(40, 40, 60, 0.7);

  > div {
    display: flex;
    align-items: center;
    background: #fff;
    width: 835px;
    height: 500px;
    border-radius: 4px;
    position: relative;
    z-index: 1000;
    border: 1px solid #f00;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      position: absolute;
      right: -18px;
      top: -18px;
      border-radius: 50%;
      background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
    }

    > section {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      width: 500px;
      padding: 20px 25px;
      margin-top: 10px;

      > div:first-child {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;

        > span:first-child {
          font-weight: bold;
          font-size: 16px;
        }

        > span:last-child {
          font-weight: 900;
          font-size: 16px;
          color: #27af9a;
        }
      }

      > div:last-child {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
        height: 40px;
        width: 145px;
        border-radius: 20px;
        position: relative;
        transition: all 0.3s;
        cursor: pointer;

        > div:first-child {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          left: 0;
          position: absolute;
          overflow: hidden;

          > span {
            font-size: 15px;
            font-weight: bold;
            color: #fff;
            opacity: 1;
            margin-left: 20px;
            margin-bottom: 1px;
          }
        }

        > div:last-child {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          height: 40px;
          width: 40px;
          right: 3px;
        }
      }
    }
  }

  @media (max-width: 600px) {
    position: fixed;
    transition: all 0.7s;
    display: flex;
    height: 100%;
    width: 100%;
    top: 0;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: rgba(40, 40, 60, 0.7);
    z-index: 10000;

    > div {
      display: flex;
      align-items: flex-start;
      background: #fff;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      position: relative;
      z-index: 1000;
      flex-direction: column;

      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        position: absolute;
        left: 5px;
        top: 5px;
        border-radius: 50%;
        background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
      }

      > section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        height: 90px;
        width: 100%;
        padding: 0 30px;
        margin-top: 10px;
        position: absolute;
        bottom: 0px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);

        > div {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-direction: column;

          > span:first-child {
            font-weight: bold;
            font-size: 16px;
          }

          > span:last-child {
            font-weight: 900;
            font-size: 16px;
            color: #27af9a;
          }
        }

        > div:last-child {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
          height: 40px;
          width: 145px;
          border-radius: 20px;
          transition: all 0.3s;
          cursor: pointer;

          > div:first-child {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            left: 0;
            width: 145px;

            > span {
              font-size: 15px;
              font-weight: bold;
              color: #fff;
              opacity: 1;
              margin-left: -30px;
              margin-bottom: 1px;
            }
          }

          > div:last-child {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            height: 40px;
            width: 40px;
            right: 5px;
          }
        }
      }
    }
  }
`;

export const Additionals = styled.div`
  height: 430px;
  margin-top: 24px;
  padding-right: 30px;
  max-width: 286px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar-track {
    background-color: #fff;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: #dad7d7;
    border-radius: 3px;
  }

  > section:last-child {
    border-bottom: 0;
  }

  > span {
    font-size: 16px;
    font-weight: bold;
    color: #27af9a;
  }

  > section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background: #fff;
    padding: 15px 20px;
    border-bottom: 2px solid rgba(39, 21, 102, 0.1);
    width: 250px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      background: #fff;
      width: 100%;

      > span:first-child {
        font-size: 13px;
        font-weight: bold;
      }

      > div {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        width: 210px;

        > span {
          color: #27af9a;
          font-size: 14px;
          font-weight: 900;
        }

        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          height: 30px;
          border-radius: 15px;
          width: 80px;
          background-image: linear-gradient(-133deg, #27af9a, #29ccb6);

          > button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: transparent;
            cursor: pointer;
          }

          > span {
            font-size: 14px;
            font-weight: bold;
            color: #fff;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 120px;
    width: 100%;
    max-width: 100%;
    height: 100%;
    margin-top: 0px;
    padding-right: 0px;
    overflow: visible;

    ::-webkit-scrollbar-track {
      background-color: #fff;
    }
    ::-webkit-scrollbar {
      width: 6px;
      background: #f4f4f4;
    }
    ::-webkit-scrollbar-thumb {
      background: #dad7d7;
      border-radius: 3px;
    }

    > section:last-child {
      border-bottom: 0;
    }

    > section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      padding: 15px 20px;
      margin-top: 15px;
      width: 100%;
      border-bottom: 0px solid rgba(39, 21, 102, 0.0);
      box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);

      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        background: #fff;
        width: 100%;

        > span:first-child {
          font-size: 15px;
          font-weight: bold;
        }

        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          width: 100%;
          margin-top: 5px;

          > span {
            color: #27af9a;
            font-size: 15px;
            font-weight: 900;
          }

          > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            height: 38px;
            border-radius: 19px;
            padding: 0 5px;
            width: 90px;
            background-image: linear-gradient(-133deg, #27af9a, #29ccb6);

            > button {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: transparent;
              cursor: pointer;
            }

            > span {
              font-size: 14px;
              font-weight: bold;
              color: #fff;
            }
          }
        }
      }
    }
  }
`;

export const Items = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: fff;
  width: 100%;
  height: 500px;
  padding: 10px;

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    background-color: fff;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow-y: scroll;

    > div:last-child {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 15px;
      padding: 0 30px;

      > span {
        font-weight: bold;
        font-size: 20px;
        color: #27af9a;
        margin-bottom: 5px;
      }
    }
  }
`;

export const BodyMenuProductItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  cursor: default;
  width: 500px;

  > div:first-child {
    > img {
      min-width: 137px;
      min-height: 137px;
      width: 137px;
      height: 137px;
      border-radius: 4px;
      object-fit: cover;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      height: 40px;
      border-radius: 4px;
      background-image: linear-gradient(-133deg, #27af9a, #29ccb6);

      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: transparent;
      }

      > span {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
      }
    }
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    background: #fff;
    border-radius: 4px;
    cursor: default;
    width: 100%;

    > div:first-child {
      display: flex;
      width: 100%;
      height: 200px;
      align-items: center;
      flex-direction: column;
      background: rgba(40, 40, 60, 0.7);
      popsition: relative;
      border-bottom-left-radius: 30px;

      > img {
        min-width: 200px;
        min-height: 200px;
        width: 200px;
        height: 200px;
        border-radius: 0px;
        object-fit: cover;
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
        flex-direction: row;
        height: 40px;
        width: 120px;
        border-radius: 20px;
        background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
        position: relative;
        right: -80px;
        top: -20px;

        > button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: transparent;
        }

        > span {
          font-size: 14px;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
`;

export const BodyMenuProductItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 5px 0 20px;
  width: 100%;

  > div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    > strong {
      font-size: 16px;
      font-weight: bold;
      color: #27af9a;
    }

    > span {
      height: 300px;
      overflow-y: scroll;
      overflow-x: hidden;

      ::-webkit-scrollbar-track {
        background-color: #fff;
      }
      ::-webkit-scrollbar {
        width: 6px;
        background: #f4f4f4;
      }
      ::-webkit-scrollbar-thumb {
        background: #dad7d7;
        border-radius: 3px;
      }
      text-align: start;
      line-height: 1.4em;
      font-size: 13px;
      margin-top: 5px;
    }
  }

  > strong {
    margin-top: 25px;
    font-size: 16px;
    font-weight: 900;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    padding: 30px;
    margin-top: 20px;

    > div {
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      > strong {
        font-size: 20px;
        font-weight: bold;
        color: #27af9a;
      }

      > span {
        height: 100%;
        text-align: start;
        line-height: 1.4em;
        font-size: 16px;
      }
    }

    > strong {
      margin-top: 25px;
      font-size: 16px;
      font-weight: 900;
    }
  }
`;

export const Separator = styled.section`
  background: rgba(39, 21, 102, 0.1);
  height: 400px;
  width: 2px;
  border-radius: 1px;

  @media (max-width: 600px) {
    display: flex;
    position: absolute;
    background: rgba(39, 21, 102, 0.1);
    height: 2px;
    width: 300px;
    border-radius: 1px;
    top: 10px;
  }
`;
