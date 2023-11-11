import React, { useState } from "react";
//
import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ChangeFileName({ currentName, onClose }) {
  const [newName, setNewName] = useState(currentName);

  const updateFileName = () => {
    alert("File Name Updated Successfully");
    onClose();
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
            placeholder={currentName}
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
            onClick={updateFileName}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
