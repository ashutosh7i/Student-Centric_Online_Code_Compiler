import { useNavigate } from "react-router-dom";
//
import {
  Box,
  Center,
  IconButton,
  Text,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
//
import { GiHamburgerMenu } from "react-icons/gi";
import { BiHome } from "react-icons/bi";

//Header component that can be shown on ide pages
function Header({ showSidebarButton = true, onShowSidebar, title, bgColor }) {
  const navigate = useNavigate();
  return (
    <Flex bg={bgColor} p={1} color="white" justifyContent="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            icon={<GiHamburgerMenu w={8} h={8} />}
            color="white"
            variant="ghost"
            colorScheme="white"
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Center flex="1" h="40px">
        <Text fontSize="xl">{title}</Text>
      </Center>
      <Box flex="1" />
      <Button
        bgColor="red.500"
        colorScheme="red"
        w={5}
        variant="solid"
        onClick={(e) => {
          e.preventDefault();
          navigate("/dashboard");
        }}
      >
        <Icon as={BiHome} color={"black"} boxSize={6}></Icon>
      </Button>
    </Flex>
  );
}

export default Header;
