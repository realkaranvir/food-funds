import "./App.css";
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
