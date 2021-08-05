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
