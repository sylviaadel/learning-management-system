import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CourseProvider } from "./state/CourseProvider";
import { UserProvider } from "./state/UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider storageKey="user-uid">
      <CourseProvider>
        <App />
      </CourseProvider>
    </UserProvider>
  </React.StrictMode>
);
