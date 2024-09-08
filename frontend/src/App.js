import "./App.css";
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
