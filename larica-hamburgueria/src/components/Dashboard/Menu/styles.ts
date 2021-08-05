import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding-right: 320px;
`;

export const MenuContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 100px;

  .editingMenuItem {
    right: 0;
    transition: all 0.3s;
  }
`;

export const BodyMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > section {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 40px 0 40px 25px;

    > span {
      font-size: 16px;
      font-weight: bold;
    }

    > section {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #27af9a;
      height: 32px;
      width: 140px;
      padding: 0 25px;
      border-radius: 16px;
      cursor: pointer;
      margin-left: 20px;

      > span {
        font-size: 13px;
        color: #fff;
      }
    }
  }
`;

export const ProductsType = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;

  > div {
    display: flex;
    align-items: center;
    flex-direction: row;

    > span {
      font-weight: bold;
      font-size: 13px;
      margin-right: 10px;
    }

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #fff;
      padding: 6px;
      transition: all 0.3s;
      position: relative;
      cursor: pointer;
    }
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
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
    bottom: 0;
    width: 320px;
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

    > span {
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 40px;
    }

    > form {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 40px;

      > div {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        > span {
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        > section {
          display: flex;
          align-items: center;
          flex-direction: row;
          padding: 12px;
          background-color: #fff;
          border-radius: 4px;
          margin: 8px 0;

          > textarea {
            height: 96px;
            padding-left: 10px;
            padding-right: 10px;
            width: 265px;
            background-color: transparent;
            font-size: 13px;
            font-family: Noto Sans JP, sans-serif;
            color: #a0a0a0;
            font-weight: 400;
            border: none;
            resize: none;
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
            ::placeholder {
              color: #a0a0a0;
              opacity: 1;
            }
          }
        }
      }

      > section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > button:first-child {
          border-radius: 4px;
          background: #27af9a;
          color: #fff;
          font-weight: bold;
          font-size: 13px;
          height: 44px;
          width: 115px;
        }

        > button:last-child {
          border-radius: 4px;
          background: #143642;
          color: #fff;
          font-weight: bold;
          font-size: 13px;
          height: 44px;
          width: 115px;
        }
      }
    }

    > section {
      margin-bottom: 30px;
      > span {
        color: #c14953;
        font-size: 13px;
        font-weight: bold;
      }

      > form {
        display: flex;
        flex-direction: column;
        width: 100%;

        margin-top: 10px;

        > div {
          display: flex;
          flex-direction: column;

          > span {
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 10px;
          }
        }

        > section {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;

          > button {
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
  }

  > section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    height: 80px;
    min-width: 320px;
    max-width: 320px;
    padding: 0 30px;
    background: #f4f2fa;

    > button:first-child {
      border-radius: 4px;
      background: #27af9a;
      color: #fff;
      font-weight: bold;
      font-size: 13px;
      height: 36px;
      width: 120px;
    }

    > button:last-child {
      border-radius: 4px;
      background: #c14953;
      color: #fff;
      font-weight: bold;
      font-size: 13px;
      height: 36px;
      width: 120px;
    }
  }
`;

export const AdditionalsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    margin-top: 20px;

    > span {
      font-size: 14px;
      font-weight: 900;
      padding-bottom: 10px;
    }

    > div {
      > span {
        font-size: 13px;
        font-weight: bold;
      }

      > form {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 10px;

        > div {
          display: flex;
          flex-direction: column;

          > input {
            display: flex;
            width: 100%;
          }
        }

        > section {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          margin-bottom: 30px;

          > button:first-child {
            border-radius: 4px;
            background: #27af9a;
            color: #fff;
            font-weight: bold;
            font-size: 13px;
            height: 44px;
            width: 115px;
          }

          > button:last-child {
            border-radius: 4px;
            background: #143642;
            color: #fff;
            font-weight: bold;
            font-size: 13px;
            height: 44px;
            width: 115px;
          }
        }
      }
    }
  }
`;

export const MenuItem = styled.div`
  top: 70px;
  width: 320px;
  position: fixed;
  top: 170px;
  right: -330px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: #e5e1ed;
  transition: all 0.3s;

  > div {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 170px;
    padding: 40px 40px 0px 40px;
    bottom: 0;
    width: 320px;
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

    > span {
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 40px;
    }

    > form {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 40px;
      
      > span {
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      > div {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        > span {
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      }

      > section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > button:first-child {
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
`;

export const MenuItemList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  > span {
    font-size: 14px;
    font-weight: 900;
    padding-bottom: 10px;
  }

  > form {
    display: flex;
    flex-direction: column;
    width: 100%;
    > span {
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    > div {
      display: flex;
      flex-direction: column;

      > input {
        display: flex;
        width: 100%;
      }
    }

    > section {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 30px;

      > button:first-child {
        border-radius: 4px;
        background: #27af9a;
        color: #fff;
        font-weight: bold;
        font-size: 13px;
        height: 44px;
        width: 115px;
      }

      > button:last-child {
        border-radius: 4px;
        background: #143642;
        color: #fff;
        font-weight: bold;
        font-size: 13px;
        height: 44px;
        width: 115px;
      }
    }
  }
`;

export const ImageInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 10px;
  }

  label {
    position: absolute;
    width: 36px;
    height: 36px;
    background: #27af9a;
    border-radius: 50%;
    right: -8px;
    bottom: 0px;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid #f4f2fa;

    input {
      display: none;
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
