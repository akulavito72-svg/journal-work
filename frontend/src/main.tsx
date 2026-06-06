import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "antd/dist/reset.css";
import "./styles.css";
import { App } from "./app/App";

dayjs.locale("ru");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
