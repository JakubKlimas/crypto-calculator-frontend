import { ToastContainer } from "react-toastify";

import { Navigation } from "./components/Navigation/Navigation";
import { Dashboard } from "./pages/Dashboard";

import "./App.css";

function App() {
  return (
    <div className="container">
      <Navigation />
      <Dashboard />
      <ToastContainer />
    </div>
  );
}

export default App;
