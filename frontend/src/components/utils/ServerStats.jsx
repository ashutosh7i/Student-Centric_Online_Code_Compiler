import React from "react";
//
import {
  Box,
  Text,
  Icon,
  VStack,
  HStack,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
//
import {
  FaServer,
  FaWifi,
  FaSignal,
  FaUserSecret,
  FaMemory,
  FaMicrochip,
} from "react-icons/fa";

const ServerStatsCard = ({ title, stat, icon }) => (
  <Box
    w={250}
    bg={useColorModeValue("gray.100", "gray.800")}
    borderRadius="lg"
    dropShadow={"lg"}
    minH="50px"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    p={4}
  >
    <HStack align="center" spacing={2}>
      <Icon as={icon} color="blue.500" />
      <Text fontSize="sm" flexShrink={0}>
        {title}
        {" :"}
      </Text>
    </HStack>
    <Text
      fontSize="sm"
      fontFamily={"monospace"}
      fontWeight="bold"
      flexShrink={0}
    >
      {stat}
    </Text>
  </Box>
);

export default function ServerStats({}) {
  return (
    <Card w={270} position={"absolute"} right={5} top={20}>
      <CardHeader>
        <Center>
          <Heading size="md">Server Stats</Heading>
        </Center>
      </CardHeader>

      <CardBody>
        <VStack spacing={4}>
          <ServerStatsCard title="Backend" stat="Available" icon={FaServer} />
          <ServerStatsCard title="Connectivity" stat="Yes" icon={FaWifi} />
          <ServerStatsCard title="Ping" stat="50ms" icon={FaSignal} />
          <ServerStatsCard
            title="Active Requests"
            stat="10"
            icon={FaUserSecret}
          />
          <ServerStatsCard title="Server RAM" stat="16GB" icon={FaMemory} />
          <ServerStatsCard
            title="Server CPU"
            stat="8 Core"
            icon={FaMicrochip}
          />
        </VStack>
      </CardBody>
    </Card>
  );
}
