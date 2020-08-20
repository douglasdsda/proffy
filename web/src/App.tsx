import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import "./assets/styles/global.css";

import Routes from "./routes";
import AppProvider from "./hooks/index";
function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
}

export default App;
