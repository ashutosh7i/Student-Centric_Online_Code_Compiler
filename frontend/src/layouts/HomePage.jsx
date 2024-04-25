//
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../state";
//
import { useAuth0 } from "@auth0/auth0-react";
//
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
  useColorMode,
  useColorModeValue,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
//
import ReactPlayer from "react-player/youtube";
//
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { GithubOriginal } from "devicons-react";
import {
  FaBicycle,
  FaClock,
  FaExchangeAlt,
  FaFan,
  FaFire,
  FaInstagram,
  FaLanguage,
  FaLock,
  FaNetworkWired,
  FaRocket,
  FaServer,
  FaTerminal,
  FaTwitter,
  FaUserCheck,
  FaYoutube,
} from "react-icons/fa";
//
import socLogo from "../assets/images/soc_logo.png";
import LoginButton from "../components/Authentication/LoginButton";
import Navbar from "../components/Navbar";
//
import image0 from "../assets/images/0.png";
import image1 from "../assets/images/1.png";
import image2 from "../assets/images/2.png";
import image3 from "../assets/images/3.png";
import image4 from "../assets/images/4.png";
import image5 from "../assets/images/5.png";
import image6 from "../assets/images/6.png";

//Navbar Component
const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Container px={4} maxW={"7xl"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box w={20} pt={5}>
            <Image loading="lazy" src={socLogo} />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2}>
              <Button variant={"ghost"} onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Button colorScheme="green"> Login</Button>
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

const Feature = ({ text, icon, iconBg, body }) => {
  return (
    <>
      <Stack direction={"row"} align={"center"}>
        <Flex
          w={10}
          h={8}
          align={"center"}
          justify={"center"}
          rounded={"full"}
          bg={iconBg}
        >
          {icon}
        </Flex>
        <VStack alignItems={"start"}>
          <Text fontWeight={500}>{text}</Text>
          <Text color={useColorModeValue("gray.800", "gray.400")}>{body}</Text>
        </VStack>
      </Stack>
    </>
  );
};

const Feature2 = ({ title, text, link }) => {
  return (
    <VStack>
      <Flex
        w={160}
        h={160}
        align={"center"}
        justify={"center"}
        //color={"white"}
        rounded={"10%"}
        //bg={"gray.100"}
        mb={1}
      >
        <Image loading="lazy" rounded={"50%"} src={link} />
      </Flex>
      <Text fontSize={"xl"} fontWeight={600}>
        {title}
      </Text>
      <Text
        textAlign={"center"}
        color={useColorModeValue("gray.800", "gray.400")}
      >
        {text}
      </Text>
    </VStack>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <Button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              About Us
            </Box>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Blog
            </Box>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Careers
            </Box>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Contact Us
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Help Center
            </Box>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Safety Center
            </Box>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Community Guidelines
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Cookies Policy
            </Box>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Privacy Policy
            </Box>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Terms of Service
            </Box>
            <Box as="a" href={"https://twitter.com/ashutosh7i"}>
              Law Enforcement
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader></ListHeader>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2024 Aashutosh Soni. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Twitter"}
              href={"https://twitter.com/ashutosh7i"}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={"YouTube"}
              href={"https://twitter.com/ashutosh7i"}
            >
              <FaYoutube />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://twitter.com/ashutosh7i"}
            >
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default function HomePage() {
  const [, setUser] = useRecoilState(userState);
  const colorMode = useColorMode();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  // console.log("userO", user);
  //console.log("isAuthenticated", isAuthenticated);
  //console.log("user", user);
  setUser(user);

  const playerRef = useRef(null);
  const [seeked, setSeeked] = useState(false);

  const handleOnPlay = () => {
    if (!seeked && playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(74);
      setSeeked(true);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxW={"5xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 15 }}
          py={{ base: 20, md: 20 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "20%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Code,
              </Text>
              <br />
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "20%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Compile,
              </Text>
              <br />
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "20%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Learn,
              </Text>
              <Text as={"span"} color={"red.400"}>
                {" everywhere!"}
              </Text>
            </Heading>
            <Text
              fontSize={"mdx2"}
              color={useColorModeValue("gray.800", "gray.300")}
            >
              Student-Centric Online Code Compiler revolutionize the way you
              code. We have created a user-centric, online code compiler that
              allows you to code, compile, and learn from anywhere, making your
              coding journey more accessible and enjoyable.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              {isAuthenticated ? (
                <Link to={"/dashboard"}>
                  <Button
                    rounded={"full"}
                    size={"lg"}
                    fontWeight={"normal"}
                    px={6}
                    colorScheme={"red"}
                    bg={"red.400"}
                    _hover={{ bg: "red.500" }}
                  >
                    Get started 🚀
                  </Button>
                </Link>
              ) : (
                <LoginButton />
              )}
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                leftIcon={<GithubOriginal />}
                onClick={() => {
                  window.open(
                    "https://github.com/ashutosh7i/Student-Centric_Online_Code_Compiler"
                  );
                }}
              >
                View Source
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box
              position={"relative"}
              height={"300px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"470px"}
              overflow={"hidden"}
            >
              <ReactPlayer
                ref={playerRef}
                alt={"Hero Image"}
                // fit={"cover"}
                // align={"center"}
                width={"100%"}
                //w={800}
                height={"100%"}
                controls={true}
                url="https://www.youtube.com/watch?v=70otZ8tULqY"
                onPlay={handleOnPlay}
              />
            </Box>
          </Flex>
        </Stack>
        <Container maxW={"5xl"} py={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={4}>
              <Heading>Current Problems?</Heading>
              <Stack
                spacing={4}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  />
                }
              >
                <Feature
                  icon={
                    <Icon as={FaExchangeAlt} color={"yellow.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Diverse Coding Environments:"}
                  body={
                    "Multiple compilers to be installed for each programming language."
                  }
                />
                <Feature
                  icon={<Icon as={FaFan} color={"green.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("green.100", "green.900")}
                  text={"Performance Challenges:"}
                  body={
                    "Slow computers hinder the coding experience, leading to frustration."
                  }
                />
                <Feature
                  icon={
                    <Icon as={FaBicycle} color={"purple.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"Data Loss Risk:"}
                  body={
                    " The risk of losing important work when transferring between computers."
                  }
                />
              </Stack>
            </Stack>
            <Flex>
              <Image
                loading="lazy"
                rounded={"md"}
                alt={"feature image"}
                src={image1}
                objectFit={"cover"}
              />
            </Flex>
          </SimpleGrid>
        </Container>
        <Box p={4}>
          <Box pb={5}>
            <Center>
              <VStack>
                <Heading>Our Idea🤔</Heading>
                <Text color={useColorModeValue("gray.800", "gray.400")}>
                  Things we Thought and Requirements from students and
                  Educators.
                </Text>
              </VStack>
            </Center>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature2
              link={image2}
              title={"Centralized Platform:"}
              text={
                "We've envisioned a centralized online platform, providing a consistent coding environment."
              }
            />
            <Feature2
              link={image3}
              title={"Multi-Language Support:"}
              text={
                "Our platform offers support for Multiple programming languages, catering to diverse needs."
              }
            />
            <Feature2
              link={image4}
              title={"Real-Time Code Saving:"}
              text={
                "We promote seamless real-time code saving and interaction to enhance your coding experience."
              }
            />
          </SimpleGrid>
        </Box>
        <Container maxW={"5xl"} py={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={4}>
              <Heading>Solution-</Heading>
              <Text color={"gray.500"} fontSize={"lg"}>
                {""}
              </Text>
              <Stack
                spacing={4}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  />
                }
              >
                <Feature
                  icon={<Icon as={FaFire} color={"yellow.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Streamlined Coding Environment:"}
                  body={
                    "We've created a user-friendly, all in one platform to eliminate all hindres."
                  }
                />
                <Feature
                  icon={<Icon as={FaRocket} color={"red.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Performance Enhancement:"}
                  body={
                    "Say goodbye to slow computers and experience coding without interruptions."
                  }
                />
                <Feature
                  icon={<Icon as={FaLock} color={"green.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"Data Security:"}
                  body={
                    "Your work is safe with us✅, no need to worry about data losses."
                  }
                />
              </Stack>
            </Stack>
            <Flex>
              <Image
                loading="lazy"
                rounded={"md"}
                alt={"feature image"}
                src={image5}
                //objectFit={"cover"}
              />
            </Flex>
          </SimpleGrid>
        </Container>
        <Container maxW={"5xl"} py={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={4}>
              <Heading>Features:</Heading>
              <Stack
                spacing={4}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  />
                }
              >
                <Feature
                  icon={<Icon as={FaServer} color={"blue.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Centralized Platform: "}
                  body={"Access your coding from anywhere on SOC."}
                />
                <Feature
                  icon={
                    <Icon as={FaLanguage} color={"green.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("orange.100", "orange.900")}
                  text={"Multi-Language Support:"}
                  body={"Code in the language of your choice."}
                />
                <Feature
                  icon={<Icon as={FaClock} color={"orange.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"Real-Time Code Saving:"}
                  body={"Never lose your work again."}
                />
              </Stack>
            </Stack>
            <Stack pt={16} spacing={4}>
              <Stack
                spacing={4}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  />
                }
              >
                <Feature
                  icon={
                    <Icon as={FaTerminal} color={"black.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"Interactive Console:"}
                  body={"Easy input and view outputs and errors."}
                />
                <Feature
                  icon={
                    <Icon as={FaUserCheck} color={"green.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("orange.100", "orange.900")}
                  text={"User Monitoring System:"}
                  body={"Educators can track and give assignments."}
                />
                <Feature
                  icon={
                    <Icon as={FaNetworkWired} color={"blue.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Locally Hosted:"}
                  body={"Works even without internet."}
                />
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>

        <Container maxW={"5xl"} py={12}>
          <Center>
            <Heading>Technolgies used</Heading>
          </Center>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Flex>
              <Image
                loading="lazy"
                rounded={"md"}
                alt={"feature image"}
                src={image0}
                objectFit={"cover"}
              />
            </Flex>
            <Box>
              <UnorderedList>
                <ListItem>
                  <Text>
                    <u>Frontend:</u> HTML, CSS, JavaScript, React, ChakraUI.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    <u>Backend:</u> Node.js, Express, Redis, Docker.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    <u>Compilation:</u> Native Compiler for various programming
                    languages.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    <u>Databases:</u> Postgres for user and code management.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    <u>Hosting:</u> NGINX and local network for wide access.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    <u>Authentication:</u> Auth0 and Google Workspace Login.
                  </Text>
                </ListItem>
              </UnorderedList>
            </Box>
            <Flex>
              <Image
                loading="lazy"
                rounded={"md"}
                alt={"feature image"}
                src={image6}
                objectFit={"cover"}
              />
            </Flex>
          </SimpleGrid>
        </Container>
      </Container>

      <Footer />
    </>
  );
}
