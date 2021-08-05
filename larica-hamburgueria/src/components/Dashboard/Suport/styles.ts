import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const SuportContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 200px;

  > span {
    font-size: 30px;
    font-weight: bold;
  }

  > p {
    font-size: 1px;
  }
`;
