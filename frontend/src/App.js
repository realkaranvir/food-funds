import "./App.css";
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.js";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Pages/Login.js";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
