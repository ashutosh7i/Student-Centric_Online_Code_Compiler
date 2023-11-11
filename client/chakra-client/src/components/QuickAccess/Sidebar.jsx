import { useNavigate } from "react-router-dom";
//
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";

//sample user data that will come from backend
let name = "Aashtosh Soni";
let email = "ashutoshsoni130@gmail.com";
let loggedIn = 20;
let imgSrc = "https://github.com/ashutosh7i.png";

//show a sider bar for quick access
function SidebarContent({ onClick }) {
  const navigate = useNavigate();

  return (
    <VStack>
      <Image src={imgSrc} w={100} />
      <Text
        style={{ fontSize: "20px", fontWeight: 500, fontFamily: "sans-serif" }}
      >{`${name}`}</Text>
      <Text>{`${email}`}</Text>
      <Text
        style={{ fontSize: "14px", fontStyle: "italic" }}
      >{`Logged in ${loggedIn} min ago...`}</Text>
      <HStack w="100%">
        <Button
          onClick={() => {
            navigate("/");
          }}
          w="100%"
        >
          Home
        </Button>
        <Button
          onClick={() => {
            navigate("/dashboard");
          }}
          w="100%"
        >
          Dashboard
        </Button>
      </HStack>
      <Button
        onClick={() => {
          navigate("/logout");
        }}
        style={{ backgroundColor: "red" }}
        w="100%"
      >
        Logout
      </Button>
    </VStack>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Quick Access</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
