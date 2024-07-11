import "./App.css";
import { Game } from "./components/game";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="wrapper" id="app-wrapper">
      <Game />
      <Toaster />
    </div>
  );
}

export default App;
