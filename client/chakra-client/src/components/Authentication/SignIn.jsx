import React, { useState } from "react";
//
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Center,
  Stack,
  Image,
  Divider,
} from "@chakra-ui/react";
//
import ForgotPasswordForm from "./ForgotPassword";
import Login from "./Login";

export default function SignIn() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"sm"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel>Email / ScholarNo / EnrollmentNo</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text
                  color={"blue.500"}
                  onClick={toggleForgotPassword} // Toggle Forgot Password component
                  cursor="pointer"
                >
                  Forgot password?
                </Text>
                {showForgotPassword && <ForgotPasswordForm />}
              </Stack>
              <Button colorScheme={"blue"} variant={"solid"}>
                Sign in
              </Button>
              <Divider />
              <Button colorScheme="pink" variant="solid" onClick={Login}>
                Google
              </Button>
            </Stack>
          </Stack>
        </Flex>
        {/* <Flex flex={1}>
            {showForgotPassword ? (
              <ForgotPasswordForm />
            ) : (
              <Image
                alt={"Login Image"}
                objectFit={"cover"}
                h={200}
                src={
                  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                }
              />
            )}
          </Flex> */}
      </Stack>
    </>
  );
}
