import React, { useState } from "react";
//
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Center,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
//
import ResetPassword from "./ResetPassword";

function TakeEmailForm({ setFormStep }) {
  const handleSendEmail = () => {
    // logic to handle the email request here
    // send an email with a reset link
    // After that, setTookEmail to 1 to show the VerifyEmailForm
    setFormStep(1);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You'll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSendEmail}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

function VerifyEmailForm({ setFormStep }) {
  const handleVerifyEmail = () => {
    // Add your logic to handle the email request here
    // send an email with a reset link
    // After that, setTookEmail to 2 to show the "Successful" message
    setFormStep(2);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          We have sent a code to your email
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          username@mail.com
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleVerifyEmail}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default function ForgotPassword() {
  const [FormStep, setFormStep] = useState(0);

  return (
    <>
      {FormStep === 0 && <TakeEmailForm setFormStep={setFormStep} />}
      {FormStep === 1 && <VerifyEmailForm setFormStep={setFormStep} />}
      {FormStep === 2 && <ResetPassword />}
    </>
  );
}
