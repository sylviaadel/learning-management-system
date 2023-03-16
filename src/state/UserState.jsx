import { createContext, useContext, useState } from "react";

const Context = createContext();

export function UserProvider({ children, storageKey }) {
  const [uid, setUid] = useState(loadUID(storageKey));
  const value = { uid, setUid, saveUID };

  function loadUID(storageKey) {
    const data = localStorage.getItem(storageKey);
    return data;
  }

  function saveUID(uid) {
    localStorage.setItem(storageKey, uid);
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUser() {
  const context = useContext(Context);
  if (!context) throw new Error("useUser() must be used within <UserProvider>");

  return context;
}
