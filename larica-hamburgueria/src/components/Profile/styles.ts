import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  top: -400px;
  right: 20%;
  position: fixed;
  transition: all 1s;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);

  .user-settings-open {
    top: 60px;
    transition: all 0.5s;
  }

  .my-orders-open {
    top: 60px;
    transition: all 0.5s;
  }

  @media (max-width: 600px) {
    display: flex;
    top: 100%;
    bottom: 0;
    left: 0;
    height: 0;
    position: fixed;
    width: 100%;
    transition: all 1s;
    z-index: 1000;
    background: #fff;
    box-shadow: 0 1px 4px rgba(39, 21, 102, 0.2);

    .user-settings-open {
      top: 0;
      transition: all 0.5s;
    }

    .my-orders-open {
      top: 0;
      transition: all 0.5s;
    }
  }
`;
