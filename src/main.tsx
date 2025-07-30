import 'antd/dist/reset.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
