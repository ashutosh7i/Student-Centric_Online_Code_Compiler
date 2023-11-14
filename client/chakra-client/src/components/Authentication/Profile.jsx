import { useState, useEffect } from "react";
//
import { useRecoilValue } from "recoil";
import { userState } from "../../state";
import { Link } from "react-router-dom";
//
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
//
import getUserFiles from "../../utils/getUserFiles";

export default function Profile() {
  const user = useRecoilValue(userState);

  const [totalCodes, setTotalCodes] = useState(0);
  useEffect(() => {
    getUserFiles(user.id)
      .then((files) => {
        setTotalCodes(files.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.id]);

  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"70px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={`${user.photos[0].value}`}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {user.displayName}
            </Heading>
            <Text color={"gray.500"}>{user.provider}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontSize={"md"} color={"gray.500"}>
                User Id-
              </Text>
              <Text fontWeight={600}>{user.id.substring(0, 10)}</Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontSize={"md"} color={"gray.500"}>
                Total Codes-
              </Text>
              <Text fontWeight={600}>{totalCodes}</Text>
            </Stack>
          </Stack>

          <Button
            w={"full"}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            as={Link}
            to="/dashboard"
          >
            Dashboard
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
