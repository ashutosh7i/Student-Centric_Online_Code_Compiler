import React, { useState, useEffect } from "react";
//
import { useParams } from "react-router-dom";
//
import axios from "axios";
//
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
//
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
//
import copyToClipboard from "../../utils/copyToClipboard.js";
import downloadFile from "../../utils/downloadCodeFile.js";
//
import {
  VStack,
  Box,
  useColorModeValue,
  Text,
  HStack,
  IconButton,
  Button,
  Icon,
  Textarea,
  useToast
} from "@chakra-ui/react";
//
import { FaEdit, FaSave, FaPlay } from "react-icons/fa";
//
import { ColorModeSwitcher } from "../../components/utils/ColorModeSwitcher.jsx";
import ShowSidebar from "../../components/QuickAccess/ShowSidebar.jsx";
import ChangeFileName from "../../components/utils/ChangeFileName.jsx";
import LoadingModal from "../../components/utils/LoadingModal.jsx";
//
import { useRecoilValue } from "recoil";
import { userState } from "../../state.js";
//
import saveToDB from "../../utils/saveToDB.js";
import readFromDB from "../../utils/readFromDB.js";
//
import { useNavigate } from "react-router-dom";
var base64 = require("base-64");

const layoutCSS = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #ccc",
};

//filename will come form db
// const filename = "hello.java";

export default function Java() {
  const toast = useToast();
  useEffect(() => {
    // On component mount, read old data and paste it in the textarea
    // setCode(readFromDB(user.id));
    readFromDB(user.id, filename)
      .then((data) => {
        toast({
          title: "Progress Retrieved 📚",
          description: "your code as it was last saved",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        if (data !== undefined) {
          setCode(data);
        }
      })
      .catch((error) => {
        toast({
          title: "Welcome",
          description:
            "your code gets saved on every run, Continues where you left off",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      });
    // setCode(`${readFromDB(user.id)}`);
  }, []);

  const navigate = useNavigate();
  // for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      //ctrl+shift+enter run shortcut
      if (e.ctrlKey && e.shiftKey && e.key === "Enter") {
        runCode();
      }
      // //esc key to go to dashboard
      // if (e.key === "Escape") {
      //   e.preventDefault();
      //   navigate("/dashboard");
      // }
    };
    window.addEventListener("keydown", handleKeyDown);
    // Remove event listener on cleanup
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const user = useRecoilValue(userState);
  const { userId, codeId } = useParams();
  let filename = codeId;
  //console.log(codeId);

  const [sizes, setSizes] = useState([200, 100, "auto"]);
  const [code, setCode] = useState(
    "// Type Java Code Below\n" +
      "// Use Main class Strictly as entry point\n\n" +
      " public class Main {\n" +
      "     public static void main(String[] args) {\n" +
      '         System.out.println("Hello, World!");\n' +
      "     }\n" +
      " }\n"
  );
  const [output, setOutput] = useState(
    "Your Output & Errors will appear here."
  ); // Store the Java code output

  const [input, setInput] = useState("7"); //Store the input from user
  const [isRunning, setisRunning] = useState(false); //Store the state of running, used to prevent multi click on run
  const [isLoading, setIsLoading] = useState(false); //state for loading modal

  //time and memory consumed
  const [timeTaken, setTimeTaken] = useState(0);
  const [memoryTaken, setMemoryTaken] = useState(0);
  const [cpuTaken, setCpuTaken] = useState(0);

  //handlers for change file name prompt
  const [isChangeFileNameOpen, setIsChangeFileNameOpen] = useState(false);
  const openPrompt = () => {
    setIsChangeFileNameOpen(true);
  };
  const closePrompt = () => {
    setIsChangeFileNameOpen(false);
  };

  const updateCode = React.useCallback((codeVal, viewUpdate) => {
    // console.log(codeVal);
    setCode(codeVal);
  }, []);

  const updateInput = React.useCallback((inputVal, viewUpdate2) => {
    // console.log(inputVal);
    setInput(inputVal);
  }, []);

  //setting up a axios instance
  const api = axios.create({
    baseURL: process.env.REACT_APP_COMPILATION_URL,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
    },
  });

  //running code
  async function runCode() {
    //saving code to db
    saveToDB(user.id, code, filename)
      .then((message) => {
        toast({
          title: "✅Saved💾",
          description: message,
          status: "info",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    //if code is not running already
    if (isRunning) {
      alert("code already running");
      console.log("code already running");
    } else {
      //then only running the code
      // Clear the previous output
      setOutput("Executing code🛠️...");
      setisRunning(true);

      //submitting the code to api
      try {
        const response1 = await api.post("/newjob", {
          language_id: 62,
          source_code: base64.encode(code),
          stdin: base64.encode(input),
        });

        //logging out the unique token to each code
        console.log("Response 1 Token:", response1.data.token);

        //fetching output from api
        if (response1.data.token) {
          //polling the server untill compilation is completed or failed.
          let status = "Processing";
          while (status === "Processing" || status === "In Queue") {
            const response2 = await api.get(
              `/jobs/${response1.data.token}`
            );
            status = response2.data.status.description;

            //diffrent outputs based on compilation
            switch (status) {
              case "Accepted":
                console.log("Accepted:", base64.decode(response2.data.stdout));
                setOutput(base64.decode(response2.data.stdout));
                setTimeTaken(response2.data.wall_time);
                setMemoryTaken(response2.data.memory / 1000);
                setCpuTaken(response2.data.time);
                break;
              case "Wrong Answer":
                console.log("Wrong Answer:", response2.data);
                setOutput("Wrong Answer");
                break;
              case "Time Limit Exceeded":
                console.log("Time Limit Exceeded:", response2.data);
                alert("Time Limit Exceeded");
                setOutput(
                  `Time Limit Exceeded\n\n
                ${base64.decode(response2.data.compile_output)}
                \n\n${base64.decode(response2.data.message)}
                \n\n${base64.decode(response2.data.stderr)}
                \n\n Output=>\n ${base64.decode(response2.data.stdout)}`
                );
                break;
              case "Compilation Error":
                console.log("Compilation Error:", response2.data);
                alert("Compilation Error");
                setOutput(
                  `Compilation Error\n
                ${base64.decode(response2.data.compile_output)}
                \n\n${base64.decode(response2.data.message)}
                \n\n${base64.decode(response2.data.stderr)}
                \n\n Output=>\n ${base64.decode(response2.data.stdout)}`
                );
                break;
              case "Runtime Error (SIGSEGV)":
              case "Runtime Error (SIGXFSZ)":
              case "Runtime Error (SIGFPE)":
              case "Runtime Error (SIGABRT)":
              case "Runtime Error (NZEC)":
              case "Runtime Error (Other)":
                console.log("Runtime Error:", response2.data);
                alert("Runtime Error");
                setOutput(
                  `${response2.data.status.description}
                ${base64.decode(response2.data.compile_output)}
                \n\n${base64.decode(response2.data.message)}
                \n\n${base64.decode(response2.data.stderr)}
                \n\n Output=>\n ${base64.decode(response2.data.stdout)}`
                );
                break;
              case "Internal Error":
                console.log("Internal Server Error:", response2.data);
                setOutput(
                  `Internal Server Error\n\n
                ${base64.decode(response2.data.compile_output)}
                \n\n${base64.decode(response2.data.message)}
                \n\n${base64.decode(response2.data.stderr)}
                \n\n Output=>\n ${base64.decode(response2.data.stdout)}`
                );
                break;
              case "Exec Format Error":
                console.log("Exec Format Error:", response2.data);
                setOutput("Exec Format Error");
                break;
              default:
                console.log(`Status: ${status}`);
                setOutput(`${status}`);
                break;
            }

            if (status === "Processing" || status === "In Queue") {
              // Add a delay before making the next request (e.g., every 1.2 seconds)
              await new Promise((resolve) => setTimeout(resolve, 1200));
            }
          }
          setisRunning(false);
        } else {
          console.error("No token found in Response 1.");
          setisRunning(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setisRunning(false);
      }
    }
  }

  return (
    <>
      <ShowSidebar title="Java" bgColor={"#0277bd"} />
      <HStack h={70} justify="space-between" w="100%" pl={10} pr={10}>
        <Text>
          {filename}
          <IconButton
            size="md"
            variant="ghost"
            color="current"
            onClick={openPrompt}
            icon={<Icon as={FaEdit} />}
          />
        </Text>
        {/* //Change file name prompt */}
        {isChangeFileNameOpen && (
          <ChangeFileName
            uid={user.id}
            currentName={filename}
            onClose={closePrompt}
            onFileNameChanged={() => {
              setTimeTaken(0);
              setMemoryTaken(0);
              setCpuTaken(0);
            }}
          />
        )}
        {/* Loading modal, will be used during compilation process. */}
        {isRunning && <LoadingModal />}
        <HStack>
          <ColorModeSwitcher />
          <Button
            colorScheme="blue"
            onClick={() => {
              downloadFile(code, filename);
              toast({
                title: "Download Starting",
                description: filename + " is being downloaded",
                status: "info",
                duration: 3000,
                isClosable: true,
              });
            }}
          >
            {"Save  "}
            <Icon as={FaSave} />
          </Button>
          <Button
            colorScheme="green"
            variant={isRunning ? "ghost" : "solid"}
            onClick={() => {
              if (!isRunning) {
                runCode();
              }
            }}
          >
            <Icon as={FaPlay} />
            {"Run "}
          </Button>
        </HStack>
      </HStack>

      <div style={{ height: "calc(100vh - 70px)" }}>
        <SplitPane sizes={sizes} onChange={(sizes) => setSizes(sizes)}>
          <div
            style={{
              ...layoutCSS,
              background: useColorModeValue("gray.50", "gray.700"),
            }}
          >
            <Box p={5} flex="1" minW="300px">
              <Text>Java</Text>
              <CodeMirror
                value={code}
                height={"calc(100vh - 70px)"}
                extensions={[java({ autocomplete: true })]}
                onChange={updateCode}
                theme={useColorModeValue("light", "dark")}
              />
            </Box>
          </div>

          <Pane minSize={400} maxSize="40%">
            <div style={{ ...layoutCSS, background: "green" }}>
              <Box
                alignSelf={{ base: "center", lg: "flex-start" }}
                borderColor={useColorModeValue("gray.200", "gray.500")}
                bg={useColorModeValue("gray.50", "gray.700")}
                h="100%"
                w="100%"
              >
                <VStack>
                  <Box w="80%" pt={7}>
                    <Text as={"b"}>Output</Text>
                    <Box border={"1px"} h={200}>
                      <Textarea
                        fontFamily="monospace"
                        border={"1px"}
                        resize="none"
                        h="100%"
                        id="ouutput"
                        value={output}
                      />
                    </Box>
                    <HStack
                      mt={"2"}
                      mb={"1"}
                      rounded={"md"}
                      p={1}
                      border={"1px"}
                      justifyContent="space-between"
                      px={4} // Add horizontal padding
                    >
                      <VStack>
                        <Text as={"b"}>Time:</Text>
                        <Text mt={"-3"} as={"i"} color={"green"}>
                          {timeTaken} sec
                        </Text>
                      </VStack>
                      <VStack>
                        <Text as={"b"}>Memory:</Text>
                        <Text mt={"-3"} as={"i"} color={"green"}>
                          {memoryTaken} mb
                        </Text>
                      </VStack>
                      <VStack>
                        <Text as={"b"}>Cpu:</Text>
                        <Text mt={"-3"} as={"i"} color={"green"}>
                          {cpuTaken} sec
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack pt={1}>
                      <Button
                        border={"1px"}
                        w="full"
                        colorScheme="gray"
                        variant="outline"
                        onClick={() => {
                          copyToClipboard(
                            document.getElementById("ouutput").value
                          );
                          toast({
                            title: "Copied📋",
                            description: "Output copied to clipboard",
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                          });
                        }}
                      >
                        Copy 📋
                      </Button>
                      <Button
                        border={"1px"}
                        w="full"
                        colorScheme="gray"
                        variant="outline"
                        id="textareaa"
                        onClick={() => {
                          setOutput("");
                          setTimeTaken(0);
                          setMemoryTaken(0);
                          setCpuTaken(0);
                          toast({
                            title: "Cleared🧹",
                            description: "Output cleared",
                            status: "warning",
                            duration: 2000,
                            isClosable: true,
                          });
                        }}
                      >
                        Clear 🧹
                      </Button>
                    </HStack>
                    <Box p={2}></Box>
                    <Text as={"b"}>Custom Input</Text>
                    <Box h={100}>
                      <Textarea
                        fontFamily="monospace"
                        value={input}
                        onChange={(event) => {
                          const newValue = event.target.value;
                          updateInput(newValue);
                        }}
                        border={"1px"}
                        resize="none"
                        h="100%"
                      ></Textarea>
                    </Box>
                  </Box>
                </VStack>
              </Box>
            </div>
          </Pane>
        </SplitPane>
      </div>
    </>
  );
}
