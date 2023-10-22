import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Dashboard from "./layouts/Dashboard";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Dashboard />
    </ChakraProvider>
  );
}

export default App;
