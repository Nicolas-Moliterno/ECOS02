import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Noto+Sans+JP:wght@300;400;500;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    background: #fff;
    color: #27303b;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: Noto Sans JP, sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: 0;
  }

  input {
    border: 0;
  }
`;
