import React, { useState } from "react";
//
import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
//
import updateFilename from "../../utils/updateFilename";

export default function ChangeFileName({ uid, currentName, onClose }) {
  const [newName, setNewName] = useState(currentName.split(".")[0]);
  const toast = useToast();

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validateFilename = (filename) => {
    if (filename === currentName) {
      return "New filename should not be the same as the current filename";
    }
    if (/^\d/.test(filename)) {
      return "Filename should not start with a number";
    }
    if (!/^[\w]+$/.test(filename)) {
      return "Filename should only contain letters, numbers, and underscores";
    }
    if (filename.length > 20) {
      return "Filename should be at most 20 characters long";
    }
    return null;
  };

  const handleConfirmClick = () => {
    const errorMessage = validateFilename(newName);
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log(uid, currentName, `${newName}.${currentName.split(".")[1]}`);
    updateFilename(uid, currentName, `${newName}.${currentName.split(".")[1]}`)
      .then((message) => {
        onClose();
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
      onClick={handleBackgroundClick}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"xs"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
      >
        <Heading fontSize={"2xl"}>Change File Name</Heading>
        <FormControl>
          <Input
            placeholder={"new filename"}
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
            onClick={handleConfirmClick}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
