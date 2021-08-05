import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  > span {
    width: 160px;
    background: #c14953;
    padding: 8px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: -10px;
    transform: translateX(-90%);
    color: #fff;

    &::before {
      content: "";
      border-style: solid;
      border-color: #c14953 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 93%;
      transform: translateX(-90%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
