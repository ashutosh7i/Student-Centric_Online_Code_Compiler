import { useState } from "react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
//
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
} from "@chakra-ui/react";
//
import {
  CplusplusOriginal,
  JavaOriginal,
  PythonOriginal,
  CsharpOriginal,
  Html5Original,
} from "devicons-react";
//
import { ColorModeSwitcher } from "../components/ColorModeSwitcher.jsx";
//
// import Login from "../components/Authentication/Login";
// import Logout from "../components/Authentication/Logout";
// import { gapi } from "gapi-script";
//
import Python from "../Pages/languages/Python.jsx";
import Vanilla from "../Pages/languages/Vanilla.jsx";

const SidebarContent = ({ onClose, setActiveComponent }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          SOC
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <NavItem
        icon={CplusplusOriginal}
        onClick={() => setActiveComponent("C++")}
      >
        C++
      </NavItem>
      <NavItem icon={JavaOriginal} onClick={() => setActiveComponent("Java")}>
        Java
      </NavItem>
      <NavItem
        icon={PythonOriginal}
        onClick={() => setActiveComponent("Python")}
      >
        Python
      </NavItem>
      <NavItem icon={CsharpOriginal} onClick={() => setActiveComponent("Cs")}>
        Cs
      </NavItem>
      <NavItem
        icon={Html5Original}
        onClick={() => setActiveComponent("Vanilla Js")}
      >
        Vanilla Js
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, onClick }) => {
  return (
    <Box
      as="div" // Use a div instead of an anchor tag
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen }) => {
  //object by google
  const userData = {
    name: "Aashutosh Soni",
    imageUrl: "https://github.com/ashutosh7i.png",
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <ColorModeSwitcher />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={userData.imageUrl !== null ? userData.imageUrl : ""}
                />

                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {userData.name != null ? userData.name : "Random User"}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>login logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeComponent, setActiveComponent] = useState("Python"); // Default to Python

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        setActiveComponent={setActiveComponent}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            setActiveComponent={setActiveComponent}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Render the active component */}
        {activeComponent === "Python" && <Python />}
        {activeComponent === "Vanilla Js" && <Vanilla />}
      </Box>
    </Box>
  );
}
