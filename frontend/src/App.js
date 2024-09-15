import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.js";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Pages/Login.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
