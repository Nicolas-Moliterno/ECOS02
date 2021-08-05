import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  height: 100%;
  top: 0px;
  bottom: -120px;

  > img {
    width: 240px;
    margin-bottom: 10px;
  }

  > span {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 900;
  }

  @media (max-width: 600px) {
    padding-bottom: 70px;
  }
`;

export const ProgressBar = styled.div<any>`
  position: absolute;
  top: 0px;
  width: 380px;
  height: 4px;

  > div {
    position: absolute;
    width: 380px;
    height: 4px;
    overflow-x: hidden;

    .line {
      position: absolute;
      opacity: 0.2;
      background: ${(props) => props.color};
      width: 150%;
      height: 4px;
    }

    .subline {
      position: absolute;
      background: ${(props) => props.color};
      height: 4px;
      width: 100%;
      animation: ${(props) =>
          props.color !== "#c14953" && props.color !== "#27af9a"
            ? "increase"
            : ""}
        2s infinite;
    }

    @keyframes increase {
      from {
        left: 0%;
        width: 0%;
      }
      to {
        /* left: 130%; */
        width: 100%;
      }
    }
  }

  @media (max-width: 600px) {
    width: 100%;

    > div {
      border-radius: 2px;
      margin: 10px;
      width: 95%;
    }
  }
`;

export const CancelOrder = styled.button`
  border-radius: 4px;
  background-image: linear-gradient(-133deg, #27af9a, #29ccb6);
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  height: 44px;
  width: 100%;
  margin-top: 30px;

  > span {
    color: #fff;
    font-weight: bold;
  }
`;
