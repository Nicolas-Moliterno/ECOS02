import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  background: #fff;
  top: -550px;
  right: 0;
  padding: 20px 0 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);
  cursor: default;
  min-width: 309px;
  max-height: 500px;
  transition: all 1s;

  > div {
    position: absolute;
    top: -5px;
    width: 100%;
    height: 6px;
    background: #fff;
    z-index: 100000;
  }

  > h2 {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 5px;
  }

  > p {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    padding-bottom: 30px;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(39, 21, 102, 0.1);
    width: 250px;

    > span {
      color: #2
      font-weight: 900;
      font-size: 16px;
      margin-left: 5px;
      color: #27af9a;
    }
  }

  > button {
    margin-top: auto;
    padding: 10px 0 20px;
    background: transparent;
    width: 100%;

    > span {
      font-size: 13px;
      color: #27af9a;
      font-weight: bold;
    }
  }
  > section {
    max-height: 500px;
    padding: 0 24px 0 30px;
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

    > section {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;
      width: 280px;
      border-radius: 4px;
      padding: 20px;
      margin-top: 15px;
      margin-bottom: 5px;
      box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);
      cursor: pointer;

      > div {
        display: block;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: row;
        max-width: 280px;

        > div {
          > span {
            font-size: 13px;
            font-weight: bold;
            > span {
              color: #27303b;
              font-size: 14px;
              font-weight: 900;
              margin: 0 3px;
            }
          }

          > p {
            font-size: 13px;
            color: #a0a0a0;
            > span {
              color: #27303b;
              font-size: 14px;
              font-weight: 900;
              margin: 0 8px 0 3px;
            }
          }
        }
      }

      > span {
        margin-top: 10px;
        color: #27af9a;
        font-size: 15px;
        font-weight: 900;
      }

      > p {
        font-size: 13px;
        color: #a0a0a0;
        margin-top: 5px;
        margin-bottom: 5px;
      }

      > button {
        margin-top: 10px;
        border-radius: 4px;
        background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        height: 44px;
        width: 100%;
      }
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      margin-top: 5px;
      padding-top: 20px;

      > span {
        color: #27af9a;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    top: 100%;
    position: absolute;
    z-index: 2000px;
    transition: all 1s;
    padding: 30px 30px;
    padding-bottom: 70px;
    box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);

    > h2 {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 0px;
    }

    > p {
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      padding-bottom: 30px;
      margin-bottom: 20px;
      border-bottom: 2px solid rgba(39, 21, 102, 0.1);
      width: 100%;

      > span {
        color: #2
        font-weight: 900;
        font-size: 18px;
        margin-left: 5px;
        color: #27af9a;
      }
    }
    > button {
      background: transparent;
      width: 100%;
      padding: 20px 0;
  
      > span {
        font-size: 13px;
        color: #27af9a;
        font-weight: bold;
      }
    }
  }
`;

export const Separator = styled.div`
  width: 309px;
  padding-top: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(39, 21, 102, 0.1);
`;

export const EmptyMyOrders = styled.section`
  width: 309px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;

  > span {
    font-weight: bold;
    font-size: 15px;
    color: #27303b;
  }
`;
