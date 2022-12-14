import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";

import GlobalStyle from "./styles/global";

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
