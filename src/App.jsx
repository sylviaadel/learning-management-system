import Home from "./pages/Home";
import "./styles/style.scss";
import Navbar from "./components/shared/Navbar";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}
