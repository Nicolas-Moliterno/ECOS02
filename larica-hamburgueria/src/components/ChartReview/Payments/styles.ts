import { Link } from "react-scroll";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > div:first-child {
    width: auto;

    > span {
      font-weight: bold;
      font-size: 16px;
    }
  }

  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 30px;
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    min-height: 85px;
    box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);
    width: 310px;

    > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      width: 310px;
      padding: 0 20px;

      > div {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        max-width: 225px;

        > span {
          font-size: 13px;
          font-weight: bold;
        }

        > p {
          font-size: 13px;
          color: #a0a0a0;

          > span {
            font-size: 16px;
            color: #27af9a;
            font-weight: 900;
            margin: 0 3px;
          }
        }
      }

      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #fff;
        padding: 6px;
        transition: all 0.3s;
        position: relative;
        cursor: pointer;

        > div {
          top: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
          position: absolute;
          opacity: 0;
        }

        &:hover {
          box-shadow: 0 0 12px rgba(39, 21, 102, 0.3);

          > div {
            transition: all 0.5s;
            opacity: 1;
          }

          * {
            z-index: 10;
            color: #fff;
          }
        }
      }
    }
  }
`;
