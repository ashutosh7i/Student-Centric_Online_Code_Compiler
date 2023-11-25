import { ReactElement } from "react";
import { useEffect, useState } from "react";
//
import { useRecoilState } from "recoil";
import { userState } from "../state";
import { Link, useNavigate } from "react-router-dom";
//
import {
  Avatar,
  Box,
  Button,
  Center,
  CloseButton,
  Container,
  createIcon,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  IconProps,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
//
import ReactPlayer from "react-player/youtube";
//
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { GithubOriginal } from "devicons-react";
import {
  FaExchangeAlt,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
//
import Navbar from "../components/Navbar";
import Dashboard from "../layouts/Dashboard";
import socLogo from "../assets/images/soc_logo.png";
import Signin from "../components/Authentication/SignIn";

//Navbar Component
const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Container px={4} maxW={"7xl"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box w={20} pt={5}>
            <Image src={socLogo} />
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
        color={"white"}
        rounded={"10%"}
        bg={"gray.100"}
        mb={1}
      >
        <Image src={link} />
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

const SimpleThreeColumns = () => {
  return (
    <Box p={4}>
      <Box pb={5}>
        <Center>
          <Heading>Our Idea🤔</Heading>
        </Center>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
          pariatur corrupti maxime natus unde sed ducimus aperiam id ea odio
          quis excepturi omnis maiores, qui eius, assumenda praesentium eos
          obcaecati?
        </Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature2
          link={
            "https://www.wikihow.com/images/thumb/2/27/Calculate-a-Square-Root-by-Hand-Step-4-Version-5.jpg/v4-460px-Calculate-a-Square-Root-by-Hand-Step-4-Version-5.jpg"
          }
          title={"Lifetime Support"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
        <Feature2
          link={"https://github.com/ashutosh7i.png"}
          title={"Unlimited Donations"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
        <Feature2
          link={"https://github.com/ashutosh7i.png"}
          title={"Instant Delivery"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
      </SimpleGrid>
    </Box>
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
            <Box as="a" href={"#"}>
              About Us
            </Box>
            <Box as="a" href={"#"}>
              Blog
            </Box>
            <Box as="a" href={"#"}>
              Careers
            </Box>
            <Box as="a" href={"#"}>
              Contact Us
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Box as="a" href={"#"}>
              Help Center
            </Box>
            <Box as="a" href={"#"}>
              Safety Center
            </Box>
            <Box as="a" href={"#"}>
              Community Guidelines
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={"#"}>
              Cookies Policy
            </Box>
            <Box as="a" href={"#"}>
              Privacy Policy
            </Box>
            <Box as="a" href={"#"}>
              Terms of Service
            </Box>
            <Box as="a" href={"#"}>
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
          <Text>© 2024 Ashutosh7i. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default function HomePage() {
  const [user, setUser] = useRecoilState(userState);
  const colorMode = useColorMode();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  // const heightt = window.innerHeight - 900;
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
                alt={"Hero Image"}
                // fit={"cover"}
                // align={"center"}
                width={"100%"}
                //w={800}
                height={"100%"}
                url="https://www.youtube.com/watch?v=70otZ8tULqY"
              />
            </Box>
          </Flex>
        </Stack>
        <Center>{"Images/ Text will be added at last.😁"}</Center>
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
                    "Existing setups in educational institutions are often inconsistent and slow."
                  }
                />
                <Feature
                  icon={<Icon as={SunIcon} color={"green.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("green.100", "green.900")}
                  text={"Performance Challenges:"}
                  body={
                    "Slow computers hinder the coding experience, leading to frustration."
                  }
                />
                <Feature
                  icon={<Icon as={SunIcon} color={"purple.500"} w={5} h={5} />}
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
                rounded={"md"}
                alt={"feature image"}
                src={
                  "https://th.bing.com/th/id/OIG.PE.5WNR.kDFMdz_fPO_p?pid=ImgGn"
                }
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
              link={
                "https://th.bing.com/th/id/OIG.i6jEKiZGmXb8UmL9gNtx?w=173&h=173&c=6&r=0&o=5&dpr=2&pid=ImgGn"
              }
              title={"Centralized Platform:"}
              text={
                "We've envisioned a centralized online platform, providing a consistent coding environment."
              }
            />
            <Feature2
              link={
                "https://cdn.kwork.com/pics/t3/69/25175250-63e6714dc5d99.jpg"
              }
              title={"Multi-Language Support:"}
              text={
                "Our platform offers support for Multiple programming languages, catering to diverse needs."
              }
            />
            <Feature2
              link={
                "https://th.bing.com/th/id/OIG.CmiJ9KpHbWsuLg8ixFp0?w=173&h=173&c=6&r=0&o=5&dpr=2&pid=ImgGn"
              }
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
                {"lorem"}
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
                  icon={<Icon as={SunIcon} color={"yellow.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Streamlined Coding Environment:"}
                  body={
                    "We've created a user-friendly, all in one platform to eliminate all hindres."
                  }
                />
                <Feature
                  icon={<Icon as={SunIcon} color={"green.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("green.100", "green.900")}
                  text={"Performance Enhancement:"}
                  body={
                    "Say goodbye to slow computers and experience coding without interruptions."
                  }
                />
                <Feature
                  icon={<Icon as={SunIcon} color={"purple.500"} w={5} h={5} />}
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
                rounded={"md"}
                alt={"feature image"}
                src={
                  "https://th.bing.com/th/id/OIG.DC3jcL7OBA4WJ1HDpCG6?w=173&h=173&c=6&r=0&o=5&dpr=2&pid=ImgGn"
                }
                objectFit={"cover"}
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
                  icon={<Icon as={SunIcon} color={"yellow.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Centralized Platform: "}
                  body={"Access your coding from anywhere on premise."}
                />
                <Feature
                  icon={<Icon as={SunIcon} color={"green.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("green.100", "green.900")}
                  text={"Multi-Language Support:"}
                  body={"Code in the language of your choice."}
                />
                <Feature
                  icon={<Icon as={SunIcon} color={"purple.500"} w={5} h={5} />}
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
                  icon={<Icon as={SunIcon} color={"purple.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"Interactive Console:"}
                  body={"Easy input and view outputs and errors."}
                />
                <Feature
                  icon={<Icon as={SunIcon} color={"purple.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"User Monitoring System:"}
                  body={"Educators can track and give assignments."}
                />
                <Feature
                  icon={<Icon as={SunIcon} color={"purple.500"} w={5} h={5} />}
                  iconBg={useColorModeValue("purple.100", "purple.900")}
                  text={"Locally Hosted:"}
                  body={"Works even without internet"}
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
                rounded={"md"}
                alt={"feature image"}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1AN3kSvzRBWzP4hbcagzKGyTgEKI8tKPTg&usqp=CAU"
                }
                objectFit={"cover"}
              />
            </Flex>
            <Box>
              <UnorderedList>
                <ListItem>
                  <Text>Frontend: HTML, CSS, JavaScript, React, ChakraUI</Text>
                </ListItem>
                <ListItem>
                  <Text>Backend: Node.js, Express</Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Compilation: Native Compiler for various programming
                    languages
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>Databases: MySQL for user and code management</Text>
                </ListItem>
                <ListItem>
                  <Text>Hosting: NGINX and local network for wide access</Text>
                </ListItem>
                <ListItem>
                  <Text>Authentication: OAuth and Google Workspace Login</Text>
                </ListItem>
              </UnorderedList>
            </Box>
            <Flex>
              <Image
                rounded={"md"}
                alt={"feature image"}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6hrJZbLx66auz8hIBHB_9MdifMK2NhKquw&usqp=CAU"
                }
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
