import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  transition: all 0.3s;
  background: #fff;
  top: 58px;
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

  > span {
    font-weight: bold;
    font-size: 15px;
  }

  > h2 {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(39, 21, 102, 0.1);
    width: 100%;
  }

  > button {
    margin-bottom: 10px;
    background: transparent;
    width: 200px;
    height: 44px;
    border-radius: 4px;
    transition: all 0.3s;

    > span {
      font-size: 14px;
      color: #27af9a;
      font-weight: bold;
    }

    &:hover {
      background-color: #27af9a;
      > span {
        color: #fff;
      }
    }
  }

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: all 0.3s;
    background: #fff;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 30px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);
    cursor: default;
    width: 100%;

    > div {
      display: none;
    }

    > span {
      font-weight: bold;
      font-size: 18px;
    }

    > h2 {
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      padding-bottom: 30px;
      margin-bottom: 20px;
      border-bottom: 2px solid rgba(39, 21, 102, 0.1);
      width: 100%;
    }

    > button {
      margin-bottom: 10px;
      background: transparent;
      width: 100%;
      height: 44px;
      border-radius: 4px;
      transition: all 0.3s;

      > span {
        font-size: 15px;
        color: #27af9a;
        font-weight: bold;
      }

      &:hover {
        background-color: #27af9a;
        > span {
          color: #fff;
        }
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
