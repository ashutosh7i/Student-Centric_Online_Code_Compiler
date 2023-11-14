import { useState, useEffect } from "react";
//
import axios from "axios";
//
import { useRecoilValue } from "recoil";
import { userState } from "../../state";
//
import Login from "./Login";
//
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Progress,
  ButtonGroup,
  FormControl,
  GridItem,
  FormLabel,
  Select,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
//
import { FcGoogle } from "react-icons/fc";

//for hero
const avatars = [
  {
    url: "https://github.com/ashutosh7i.png",
  },
  {
    url: "https://github.com/adityapaliwal1.png",
  },
  {
    url: "https://github.com/aarav72.png",
  },
  {
    url: "https://github.com/deependraparmar.png",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

//background effect
const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={-1}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

//step1 form for basic details
const Localauth_Form1 = ({ setUserType }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Basic Details
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="First name" />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input id="email" type="email" placeholder="academic email preffered" />
      </FormControl>

      <FormControl as={GridItem} mt={"2%"} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          User Type
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(e) => setUserType(e.target.value)}
        >
          <option>Student</option>
          <option>Normal User</option>
        </Select>
      </FormControl>
    </>
  );
};

//Conditional step 2 form for students.
const Localauth_Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Academic Details
      </Heading>

      <FormControl mt="2%">
        <FormLabel htmlFor="scholar-number" fontWeight={"normal"}>
          Scholar Number
        </FormLabel>
        <Input id="scholar-number" placeholder="Scholar Number" />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="class" fontWeight={"normal"}>
          Class
        </FormLabel>
        <Input id="class" placeholder="Class" />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="enrollment-no" fontWeight={"normal"}>
          Enrollment No
        </FormLabel>
        <Input id="enrollment-no" placeholder="Enrollment No" />
      </FormControl>
    </>
  );
};

//Step 3 form  for username and Password.
const Localauth_Form3 = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Login Details
      </Heading>

      <FormControl mr="5%">
        <FormLabel htmlFor="username" fontWeight={"normal"}>
          Username
        </FormLabel>
        <Input id="username" placeholder="username" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

//Handler for 3 step form
function LocalAuth() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [userType, setUserType] = useState("");

  return (
    <>
      {/* <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Localauth_Form1 setUserType={setUserType} />
        ) : step === 2 ? (
          <Localauth_Form2 />
        ) : (
          <Localauth_Form3 />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  if (userType === "Student" || step !== 1) {
                    setStep(step + 1);
                    setProgress(progress + 33.33);
                  } else {
                    // If user type is not "Student" and we're on step 1, skip to step 3
                    setStep(3);
                    setProgress(100);
                    // Set academic details to "NA_NormalUser"
                    // ... (depends on how you're storing these details)
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box> */}
      <form action="http://localhost:5000/auth/login/password" method="post">
        <div>
          <label for="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required
          />
        </div>
        <div>
          <label for="current-password">Password</label>
          <input
            id="current-password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </>
  );
}

const Googleauth_Form1 = () => {
  const user = useRecoilValue(userState);
  console.log(user);
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Google Auth SignUp
      </Heading>

      <Button
        w="100%"
        colorScheme="red"
        variant="solid"
        onClick={() => {
          Login();
          console.log(user);
        }}
      >
        <Flex alignItems="center">
          <Icon
            as={FcGoogle}
            w="20%"
            h="5%"
            mr="5%"
            _hover={{ color: "white" }}
          />
          <Text>Sign Up with Google</Text>
        </Flex>
      </Button>

      {/* <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="First name" />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input id="email" type="email" placeholder="academic email preffered" />
      </FormControl>
       */}
    </>
  );
};

const Googleauth_Form2 = ({ setUserType }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Academic Details
      </Heading>

      <FormControl as={GridItem} mt={"2%"} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          User Type
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(e) => setUserType(e.target.value)}
        >
          <option>Student</option>
          <option>Normal User</option>
        </Select>
      </FormControl>
    </>
  );
};

function GoogleAuth() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [userType, setUserType] = useState("");

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Googleauth_Form1 setUserType={setUserType} />
        ) : step === 2 ? (
          <Googleauth_Form2 />
        ) : (
          <Localauth_Form3 />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  if (userType === "Student" || step !== 1) {
                    setStep(step + 1);
                    setProgress(progress + 33.33);
                  } else {
                    // If user type is not "Student" and we're on step 1, skip to step 3
                    setStep(3);
                    setProgress(100);
                    // Set academic details to "NA_NormalUser"
                    // ... (depends on how you're storing these details)
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default function SignUp() {
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"6xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={10}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Ready to Code?{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              ./
            </Text>{" "}
            Start your coding journey today.
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.700"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Register
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                {" soc"}
              </Text>
            </Heading>
          </Stack>
          <LocalAuth />
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}
