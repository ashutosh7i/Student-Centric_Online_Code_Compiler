import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  CloseButton,
  Container,
  Drawer,
  DrawerContent,
  Flex,
  FormControl,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  VStack,
  useToast,
} from "@chakra-ui/react";
//
import {
  CplusplusOriginal,
  CsharpOriginal,
  Html5Original,
  JavaOriginal,
  PythonOriginal,
} from "devicons-react";
//
import {
  FiBell,
  FiChevronDown,
  FiDelete,
  FiEdit,
  FiEdit2,
  FiEdit3,
  FiMenu,
  FiPenTool,
} from "react-icons/fi";
//
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import DeleteFile from "../components/utils/DeleteFile.jsx";
import ServerStats from "../components/utils/ServerStats.jsx";
//
import { useRecoilValue } from "recoil";
import { userState } from "../state.js";
//
import getUserFiles from "../utils/getUserFiles.js";
//
import moment from "moment";

const iconMapping = {
  cpp: CplusplusOriginal,
  java: JavaOriginal,
  py: PythonOriginal,
  cs: CsharpOriginal,
  html: Html5Original,
};

function CodeFile({ user, fileName, lastOpened, onFileDeleted }) {
  const navigate = useNavigate();
  const toast = useToast();

  const handleEditClick = (e) => {
    e.preventDefault();
    toast({
      title: "Navigating",
      description: `Opening ${fileName} for editing.`,
      status: "info",
      duration: 1000,
      isClosable: true,
    });
    setTimeout(() => {
      navigate(`/${fileName.split(".").pop()}/${user}/${fileName}`);
      toast({
        title: "🚀Happy Coding👨🏻‍💻!",
        description: `Opened ${fileName} for editing.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }, 1000);
  };

  const fileExtension = fileName.split(".").pop();
  const IconComponent = iconMapping[fileExtension];

  return (
    <HStack justify="space-between">
      <HStack spacing={1}>
        {IconComponent && <Icon as={IconComponent} size={20} />}
        <Heading size="xs" align="start" textTransform="capitalize">
          {fileName}
        </Heading>
      </HStack>

      <HStack spacing={4}>
        <Text fontSize="sm">{lastOpened}</Text>
        <Button colorScheme="green" variant="solid" onClick={handleEditClick}>
          <Icon as={FiEdit2} boxSize={5} />
        </Button>
        <DeleteFile
          uid={user}
          actualFilename={fileName}
          onFileDeleted={onFileDeleted}
        />
      </HStack>
    </HStack>
  );
}

export default function Dashboard() {
  const user = useRecoilValue(userState);
  const [userFiles, setUserFiles] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchUserFiles = async () => {
      const files = await getUserFiles(user.id);
      setUserFiles(files);
    };

    fetchUserFiles();
  }, [user.id]);

  useEffect(() => {
    const newUser = userFiles.some((file) => file.filename === "New User");
    if (newUser) {
      toast({
        title: "✨Welcome to SOC🚀",
        description: `Click on the "New File" button to get started.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [userFiles, toast]);

  const [isLargerThanMD] = useMediaQuery("(min-width: 65em)"); // 48em is equivalent to 'md' in Chakra UI

  return (
    <>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Sidebar />

        <Container mx={60} p="4">
          <Card>
            <CardHeader>
              <Center>
                <Heading size="md">Your Activity</Heading>
              </Center>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {/* //sorting files by timestamp */}
                {userFiles
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((file) =>
                    file.filename === "New User" ? (
                      <Center>
                        <Text>Welcome, new user</Text>
                      </Center>
                    ) : (
                      <CodeFile
                        user={user.id}
                        key={file.filename}
                        fileName={file.filename}
                        lastOpened={moment(file.timestamp).fromNow()}
                        onFileDeleted={() =>
                          setUserFiles((oldFiles) =>
                            oldFiles.filter((f) => f.filename !== file.filename)
                          )
                        }
                      />
                    )
                  )}
              </Stack>
            </CardBody>
          </Card>
        </Container>
        {isLargerThanMD && <ServerStats />}
        {/* <ServerStats /> */}
      </Box>
    </>
  );
}
