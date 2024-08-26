import App from "./App";
import { ToastContainer } from "react-toastify";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import initializeAxios from "apis/axios";
import { QueryClientProvider } from "react-query";
import queryClient from "utils/queryClient";

initializeAxios();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
