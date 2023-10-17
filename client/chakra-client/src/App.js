import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Home from './layouts/DashBoard';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home />
      {/* <Dashboard /> */}
    </ChakraProvider>
  );
}

export default App;
