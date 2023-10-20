import { Box, Center, IconButton, Text, Flex } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

//Header component that can be shown on ide pages
const Header = ({
  showSidebarButton = true,
  onShowSidebar,
  title,
  bgColor,
}) => {
  return (
    <Flex bg={bgColor} p={1} color="white" justifyContent="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            icon={<FiChevronRight w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Center flex="1" h="40px">
        <Text fontSize="xl">{title}</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  );
};

export default Header;
