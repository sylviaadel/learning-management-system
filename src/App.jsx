import { BrowserRouter } from "react-router-dom";
import "./styles/style.scss";
import Navbar from "./components/shared/Navbar";
import LoggedRoutes from "./routes/LoggedRoutes";
import UnloggedRoutes from "./routes/UnloggedRoutes";
import { useUser } from "./state/UserProvider";

export default function App() {
  const { uid } = useUser();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {uid ? <LoggedRoutes /> : <UnloggedRoutes />}
      </BrowserRouter>
    </div>
  );
}
