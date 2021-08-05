import styled from "styled-components";

export const Container = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  > img {
    width: 190px;
    height: 190px;
    margin-bottom: 10px;
  }

  > span {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 900;
    text-align: center;
  }

  @media (max-width: 600px) {
    margin-top: 30px;
    width: 100%;
  }
`;
