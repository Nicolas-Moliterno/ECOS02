import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  transition: all 1s;
  background: #fff;
  top: -600px;
  right: 0;
  padding: 20px 30px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);
  cursor: default;

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
    margin-bottom: 20px;
  }

  > button {
    margin-top: 15px;
    margin-bottom: 10px;
    background: transparent;

    > span {
      font-size: 14px;
      color: #27af9a;
      font-weight: bold;
    }
  }

  > form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;

    > button {
      margin-top: 20px;
      border-radius: 4px;
      background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      height: 44px;
      width: 309px;
    }
  }

  @media (max-width: 600px) {
    top: 100%;
    left: 0;
    height: 100%;
    position: relative;
    width: 100%;
    box-shadow: 0 1px 4px rgba(39, 21, 102, 0);
    transition: all 1s;
    background: #fff;
    z-index: 2000;
    padding: 30px;

    > h2 {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 30px;
      width: 100%;
      text-align: center;
    }
  }
`;

export const Separator = styled.div`
  width: 309px;
  padding-top: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(39, 21, 102, 0.1);
`;
