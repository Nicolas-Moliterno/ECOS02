import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: first baseline;
  flex-direction: column;
  position: relative;
  background: #fff;
  width: 100%;
  height: 100%;
`;

export const Cart = styled.div`
  display: flex;
  align-items: center;
  justify-content: first baseline;
  flex-direction: column;
  position: relative;
  background: #fff;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 120px;

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

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 25px;
    margin-bottom: 5px;
  }

  > section {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 310px;
    height: 120px;
    transition: all 0.7s;
    padding: 15px 0px;

    > div:first-child {
      background-color: #fff;

      > div {
        background: rgba(39, 21, 102, 0.1);
        width: 310px;
        height: 1px;
      }
    }

    > div:last-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      height: 100%;
      width: 100%;
      padding: 0;
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
        width: 40px;
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
          transition: all 0.3s;
          width: 0px;
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
          right: 1px;
          transition: all 0.3s;
        }

        &:hover {
          width: 137px;
          > div:first-child {
            width: 90px;
          }
          > div:last-child {
            right: 5px;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    margin-bottom: 190px;
    > section {
      bottom: 70px;
      > div:first-child {
        background-color: #fff;

        > div {
          background: rgba(39, 21, 102, 0.1);
          width: 310px;
          height: 1px;
        }
      }

      > div:last-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        height: 100%;
        width: 100%;
        padding: 0;
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
          width: 137px;
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
            transition: all 0.3s;
            width: 90px;
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
            right: 5px;
            transition: all 0.3s;
          }

          &:hover {
            width: 137px;
            > div:first-child {
              width: 90px;
            }
            > div:last-child {
              right: 5px;
            }
          }
        }
      }
    }
  }
`;
