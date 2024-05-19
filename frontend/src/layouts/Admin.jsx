import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import getAllUsers from "../utils/getAllUsers.js";
import getUserFiles from "../utils/getUserFiles";
import readFromDB from "../utils/readFromDB.js";
import saveToDB from "../utils/saveToDB.js";
import deleteUserFile from "../utils/deleteUserFile.js";
import CodeMirror from "@uiw/react-codemirror";

export default function Admin() {
  const [allUsers, setAllUsers] = useState([]);
  const [targetUser, setTargetUser] = useState("");
  const [userFiles, setUserFiles] = useState([]);
  const [targetFile, setTargetFile] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const password = prompt("Enter password");
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      const fetchUserFiles = async () => {
        const res = await getAllUsers();
        setAllUsers(res);
      };

      fetchUserFiles();
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated && targetUser) {
      getUserFiles(targetUser).then((res) => {
        setUserFiles(res);
      });
    }
  }, [authenticated, targetUser]);

  useEffect(() => {
    if (authenticated && targetFile) {
      readFromDB(targetUser, targetFile).then((res) => {
        setFileContent(res);
      });
    }
  }, [authenticated, targetFile]);

  const updateCode = useCallback((codeVal) => {
    setFileContent(codeVal);
  }, []);

  const saveFile = async () => {
    saveToDB(targetUser, fileContent, targetFile)
      .then((res) => {
        console.log(res);
        alert(res);
      })
      .catch((error) => {
        console.error(error);
        alert("Error: " + error.message);
      });
  };

  const deleteFile = async () => {
    deleteUserFile(targetUser, targetFile)
      .then((res) => {
        console.log(res);
        alert(res);
        // After deletion, clear file content
        setFileContent("");
      })
      .catch((error) => {
        console.error(error);
        alert("Error: " + error.message);
      });
  };

  if (!authenticated) {
    return null;
  }

  return (
    <Container maxW={"5xl"} py={12}>
      <VStack spacing={8}>
        <Heading size="lg">Admin Panel</Heading>
        <Accordion allowToggle width="100%">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Users
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {allUsers.map((user) => (
                <Text
                  key={user.id}
                  onClick={(e) => {
                    setTargetUser(user.id);
                  }}
                  cursor="pointer"
                  _hover={{ color: "blue.500" }}
                >
                  {user.id}
                </Text>
              ))}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Files
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {userFiles.map((file) => (
                <Text
                  key={file.filename}
                  onClick={(e) => {
                    setTargetFile(file.filename);
                  }}
                  cursor="pointer"
                  _hover={{ color: "blue.500" }}
                >
                  {file.filename}
                </Text>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Box
          border={"2px"}
          borderColor={borderColor}
          p={4}
          borderRadius="md"
          boxShadow="lg"
          width="100%"
          bg={bgColor}
        >
          <Heading size="md" mb={2}>
            File Content
          </Heading>
          <CodeMirror
            value={fileContent}
            options={{
              lineNumbers: true,
            }}
            onChange={updateCode}
          />
          <Button onClick={saveFile} colorScheme="blue" mt={4} mr={2}>
            Save
          </Button>
          <Button onClick={deleteFile} colorScheme="red" mt={4}>
            Delete
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}