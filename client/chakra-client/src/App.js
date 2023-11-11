import React from "react";
//
import { RecoilRoot } from "recoil";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
//
import { ChakraProvider, theme, useMediaQuery } from "@chakra-ui/react";
//
//
import HomePage from "./layouts/HomePage";
import Dashboard from "./layouts/Dashboard";
//
import Cpp from "./Pages/languages/Cpp";
import Cs from "./Pages/languages/Cs";
import Java from "./Pages/languages/Java";
import Python from "./Pages/languages/Python";
import Vanilla from "./Pages/languages/Vanilla";
//
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/Signup";
//
import DesktopOnly from "./components/DesktopOnly";

function App() {
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        {isLargerThanMD ? (
          <Router>
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/cpp/:userId/:codeId" exact element={<Cpp />} />
              <Route path="/java/:userId/:codeId" exact element={<Java />} />
              <Route path="/py/:userId/:codeId" exact element={<Python />} />
              <Route path="/cs/:userId/:codeId" exact element={<Cs />} />
              <Route path="/html/:userId/:codeId" exact element={<Vanilla />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="/signin" exact element={<SignIn />} />
            </Routes>
          </Router>
        ) : (
          <DesktopOnly />
        )}
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
