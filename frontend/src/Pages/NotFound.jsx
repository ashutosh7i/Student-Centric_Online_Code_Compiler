import React from "react";
import { Box, Center, Heading, Text, Link } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Center
      minH="calc(100vh - 4rem)"
      py={10}
      flexDir="column"
      textAlign="center"
      spacing={4}
    >
      <Box>
        <Heading
          as="h1"
          fontSize="4xl"
          fontWeight="bold"
          letterSpacing="tighter"
          lineHeight="shorter"
        >
          404 Not Found
        </Heading>
        <Text maxW="600px" color="gray.500" fontSize="xl" mt={2}>
          The page you were looking for does not exist. You may have mistyped
          the address or the page may have moved.
        </Text>
      </Box>
      <Link
        onClick={()=>{window.open("/")}}
        display="inline-flex"
        alignItems="center"
        rounded="md"
        border="1px"
        borderColor="gray.200"
        bg="white"
        px={8}
        fontSize="sm"
        fontWeight="medium"
        shadow="sm"
        transition="colors"
        _hover={{ bg: "gray.100", color: "gray.900" }}
        _focus={{ outline: "none", ring: "1px", ringColor: "gray.950" }}
        _disabled={{ pointerEvents: "none", opacity: 0.5 }}
        dark={{
          borderColor: "gray.800",
          bg: "gray.950",
          _hover: { bg: "gray.800", color: "gray.50" },
          _focus: { ringColor: "gray.300" },
        }}
      >
        Go back home
      </Link>
    </Center>
  );
}
