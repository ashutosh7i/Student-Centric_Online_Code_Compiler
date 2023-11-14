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
import Logout from "./components/Authentication/Logout";
import Profile from "./components/Authentication/Profile";
//
import DesktopOnly from "./components/DesktopOnly";
import ProtectedRoute from "./components/utils/ProtectedRoute";

function App() {
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        {isLargerThanMD ? (
          <Router>
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route
                path="/dashboard"
                exact
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                exact
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cpp/:userId/:codeId"
                exact
                element={
                  <ProtectedRoute>
                    <Cpp />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/java/:userId/:codeId"
                exact
                element={
                  <ProtectedRoute>
                    <Java />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/py/:userId/:codeId"
                exact
                element={
                  <ProtectedRoute>
                    <Python />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cs/:userId/:codeId"
                exact
                element={
                  <ProtectedRoute>
                    <Cs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/html/:userId/:codeId"
                exact
                element={
                  <ProtectedRoute>
                    <Vanilla />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="/signin" exact element={<SignIn />} />
              <Route path="/logout" element={<Logout />} />
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
