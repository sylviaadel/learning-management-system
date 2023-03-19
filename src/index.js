import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CoursesProvider } from "./state/CoursesProvider";
import { UsersProvider } from "./state/UsersProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersProvider storageKey="user-uid">
      <CoursesProvider>
        <App />
      </CoursesProvider>
    </UsersProvider>
  </React.StrictMode>
);
