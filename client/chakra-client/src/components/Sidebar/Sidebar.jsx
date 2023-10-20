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
const SidebarContent = ({ onClick }) => (
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
      <Button onClick={onClick} w="100%">
        Home
      </Button>
      <Button onClick={onClick} w="100%">
        Dashboard
      </Button>
    </HStack>
    <Button onClick={onClick} style={{ backgroundColor: "red" }} w="100%">
      Logout
    </Button>
  </VStack>
);

const Sidebar = ({ isOpen, onClose }) => (
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

export default Sidebar;
