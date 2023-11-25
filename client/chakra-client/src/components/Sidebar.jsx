import React, { useState } from "react";
//
import { Link, useNavigate } from "react-router-dom";
//
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  useDisclosure,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Container,
  VStack,
  HStack,
  Textarea,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  useToast,
} from "@chakra-ui/react";
//
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiPlus,
  FiDroplet,
  FiLogOut,
} from "react-icons/fi";
//
import Logout from "./Authentication/Logout";
//
import { useRecoilValue } from "recoil";
import { userState } from "../state";

const LinkItems = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Docs", icon: FiDroplet, link: "/" },
  { name: "Explore", icon: FiCompass, link: "/" },
  { name: "Favourites", icon: FiStar, link: "/" },
  { name: "Settings", icon: FiSettings, link: "/profile" },
];

const NavItem = ({ icon, children, link, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        as={Link}
        to={link}
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
        {...rest}
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

export default function Sidebar() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [formData, setFormData] = useState({
    fileName: "",
    language: "",
    user: user.id,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Check if both filename and language are provided
    if (formData.fileName && formData.language) {
      // Validate the filename
      const filenameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
      if (!filenameRegex.test(formData.fileName)) {
        toast({
          title: "Invalid Filename",
          description:
            "Filename can only contain letters, numbers, and underscores. It cannot start with a number.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const examplePromise = new Promise((resolve, reject) => {
        setIsLoading(true);
        setTimeout(() => {
          resolve(200);
          setIsLoading(false);
          console.log("Form Data:", formData);
          console.log(
            `File created: ${formData.fileName}.${formData.language}`
          );
          onClose();
          let red = `/${formData.language}/${user.id}/${formData.fileName}.${formData.language}`;
          console.log(red);
          navigate(red);
        }, 1000);
      });

      toast.promise(examplePromise, {
        success: { title: "Done ✅", description: "Opening IDE🛠️" },
        error: { title: "Error", description: "Something went wrong" },
        loading: { title: "Creating...", description: "Please wait" },
      });
    } else {
      // Display an alert to the user if filename or language is missing
      toast({
        title: "Missing Information",
        description: "Please enter both filename and select a language.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFileNameChange = (e) => {
    setFormData({ ...formData, fileName: e.target.value });
  };

  const handleLanguageChange = (e) => {
    setFormData({ ...formData, language: e.target.value });
  };

  return (
    <>
      {/* left sidebar */}
      <Box
        mt={5}
        bg={useColorModeValue("f4f4f5", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={60}
        pos="fixed"
        h="full"
      >
        <Center>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            w={"52"}
            variant="solid"
            mt={5}
            mb={10}
            onClick={onOpen}
            _hover={{
              bg: "green.300",
            }}
          >
            New code
          </Button>
        </Center>

        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>
        ))}

        <Modal
          closeOnOverlayClick={false}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          motionPreset="slideInTop"
        >
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleFormSubmit}>
              <ModalHeader>Create new code</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Container>
                  <HStack display={"flex"}>
                    <VStack display={"flex-start"}>
                      <FormControl>
                        <FormLabel>FileName</FormLabel>
                        <Input
                          placeholder="ashutosh.7i"
                          type="text"
                          onChange={handleFileNameChange}
                          autoFocus //brings keyboard focus when opened
                        />
                      </FormControl>
                    </VStack>
                    <VStack display={"flex-start"}>
                      <FormControl>
                        <FormLabel>Language</FormLabel>
                        <Select onChange={handleLanguageChange} defaultValue="">
                          <option value="">Select a language</option>
                          <option value="cpp">C++</option>
                          <option value="java">Java</option>
                          <option value="py">Python</option>
                          <option value="cs">C#</option>
                          <option value="html">VanillaJs</option>
                        </Select>
                      </FormControl>
                    </VStack>
                  </HStack>
                </Container>
              </ModalBody>
              <ModalFooter>
                <Button
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Creating..."
                >
                  Create
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <Center>
          <Button
            rightIcon={<FiLogOut />}
            colorScheme="red"
            w={"40"}
            variant="solid"
            mt={5}
            mb={10}
            onClick={(e) => {
              e.preventDefault();
              Logout();
            }}
          >
            Logout
          </Button>
        </Center>
      </Box>
    </>
  );
}
