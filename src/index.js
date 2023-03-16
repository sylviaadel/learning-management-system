import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./state/UserState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider storageKey="user-uid">
      <App />
    </UserProvider>
  </React.StrictMode>
);
