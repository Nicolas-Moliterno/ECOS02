import styled, { css } from "styled-components";
import Tooltip from "../Tooltip";

interface ContainerProps {
  isFocused: boolean;
  isFullfilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 12px;
  background-color: #eee;
  border-radius: 4px;

  > input {
    margin-left: 10px;
    margin-right: 10px;
    width: 265px;
    background-color: transparent;
    font-size: 13px;
    color: #a0a0a0;
    font-weight: 400;

    ::placeholder {
      color: #a0a0a0;
      opacity: 1;
    }
  }

  & + div {
    margin-top: 8px;
  }
`;

export const Error = styled(Tooltip)`
  position: relative;
  height: 20px;
  svg {
    left: -20px;
    position: absolute;
  }
  > span {
    background: #c14953;
    color: #fff;
    font-size: 13px;
    font-weight: bold;

    &::before {
      border-color: #c14953 transparent;
    }
  }
`;
