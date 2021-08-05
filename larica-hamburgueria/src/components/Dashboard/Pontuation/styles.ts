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
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th, td {
    padding: 15px;
  }

  th {
    text-align: left;
  }

  table {
    border-spacing: 5px;
  }

  > span {
    font-size: 30px;
    font-weight: bold;
  }

  > p {
    font-size: 1px;
  }
`;
