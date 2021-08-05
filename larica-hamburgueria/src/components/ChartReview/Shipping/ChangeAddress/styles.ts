import styled from "styled-components";

export const Container = styled.div`
  .editAddress {
    height: 468px;
  }

  .toast-error {
    background: #c14953;
  }

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 0;
    overflow: hidden;
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
    }
  }
`;
export const Separator = styled.div`
  width: 309px;
  height: 1px;
  margin: 20px 0;
  background: rgba(39, 21, 102, 0.1);
  border-radius: 1px;
`;
