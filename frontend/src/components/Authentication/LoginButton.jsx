import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";
export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      rounded={"full"}
      size={"lg"}
      fontWeight={"normal"}
      px={6}
      colorScheme={"red"}
      bg={"red.400"}
      onClick={() => loginWithRedirect()}
      _hover={{ bg: "red.500" }}
    >
      Login
    </Button>
  );
}
