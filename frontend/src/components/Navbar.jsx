import { Link, useNavigate } from "react-router-dom";
//
import { useRecoilValue } from "recoil";
import { userState } from "../state";
//
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
//
import socLogo from "../assets/images/soc_logo.png";
//
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Authentication/LoginButton";

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const user = useRecoilValue(userState);
  //console.log(user);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth0();
  return (
    <>
      <Container
        px={4}
        maxW={"7xl"}
        bg={useColorModeValue("f4f4f5", "gray.900")}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box w={20} as={Link} to={"/"}>
            <Image src={socLogo} />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2}>
              <Button variant={"ghost"} onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={`${user.picture}`} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"lg"} src={`${user.picture}`} />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem as={Link} to={"/profile"}>
                      Profile
                    </MenuItem>
                    <MenuItem as={Link} to={"/dashboard"}>
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                // <Button
                //   onClick={() => {
                //     Login();
                //   }}
                // >
                //   Login
                // </Button>
                <LoginButton />
              )}
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
