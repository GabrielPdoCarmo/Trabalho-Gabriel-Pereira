// src/App.js

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";
import CardList from "./pages/CardList";
import CardDetails from "./pages/CardDetails"; // Importe o componente CardDetails

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/cards",
    element: <CardList />,
  },
  {
    path: "/card/:id", // Adicione a rota para a página de detalhes da carta
    element: <CardDetails />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <div className="body">
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
