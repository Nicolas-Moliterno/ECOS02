import styled from "styled-components";

export const Container = styled.div`
  .editPayment {
    height: 265px;
  }

  .toast-error {
    background: #c14953;
  }

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    height: 0;
    transition: all 0.3s;
    bottom: 0;

    > form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      > div {
        width: 270px;
      }

      > button {
        margin-top: 20px;
        border-radius: 4px;
        background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
        color: #fff;
        font-weight: bold;
        font-size: 13px;
        height: 44px;
        width: 270px;
      }

      > div.radio {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        padding: 2px 15px;
        margin-bottom: 20px;
        width: 100%;
        background: transparent;

        > label {
          font-size: 13px;
          font-weight: bold;
          & + label {
            margin-top: 15px;
          }
          > input {
            margin-right: 15px;
          }
          > input[type="radio"]:after {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            top: -2px;
            left: -1px;
            position: relative;
            background-color: #fff;
            content: "";
            display: inline-block;
            visibility: visible;
            border: 2px solid #27af9a;
          }

          > input[type="radio"]:checked:after {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            top: -2px;
            left: -1px;
            position: relative;
            background-color: #27af9a;
            content: "";
            display: inline-block;
            visibility: visible;
            border: 2px solid #27af9a;
          }
        }
      }
    }
  }
`;
export const Separator = styled.div`
  width: 270px;
  height: 1px;
  margin: 20px 0;
  background: rgba(39, 21, 102, 0.1);
  border-radius: 1px;
`;
