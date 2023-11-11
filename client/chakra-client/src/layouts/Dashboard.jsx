import { useState } from "react";
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

const iconMapping = {
  cpp: CplusplusOriginal,
  java: JavaOriginal,
  py: PythonOriginal,
  cs: CsharpOriginal,
  html: Html5Original,
};

function CodeFile({ fileName, lastOpened }) {
  const navigate = useNavigate();
  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`/${fileName.split(".").pop()}/user1/${fileName}`);
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
        <DeleteFile />
      </HStack>
    </HStack>
  );
}

export default function Dashboard() {
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
                <CodeFile fileName={"ashutosh.cpp"} lastOpened={"5 min ago"} />
                <CodeFile fileName={"tst.java"} lastOpened={"5 min ago"} />
                <CodeFile fileName={"ml.py"} lastOpened={"5 min ago"} />
                <CodeFile fileName={"pattern.cs"} lastOpened={"5 min ago"} />
                <CodeFile fileName={"ash.html"} lastOpened={"5 min ago"} />
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
