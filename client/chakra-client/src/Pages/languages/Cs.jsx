import React, { useState } from "react";
import { FaEdit, FaSave, FaPlay } from "react-icons/fa";
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
} from "@chakra-ui/react";
//
import { ColorModeSwitcher } from "../../components/ColorModeSwitcher.jsx";
import ShowSidebar from "../../components/Sidebar/ShowSidebar.jsx";
import ChangeFileName from "../../components/ChangeFileName.jsx";
//
import CodeMirror from "@uiw/react-codemirror";
import { csharp } from "@replit/codemirror-lang-csharp";
//
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
//
import copyToClipboard from "../../utils/copyToClipboard.js";
import downloadFile from "../../utils/downloadCodeFile.js";

const layoutCSS = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #ccc",
};

//filename will come form db
const filename = "hello.cs";

export default function Cs() {
  const [sizes, setSizes] = useState([200, 100, "auto"]);
  const [code, setCode] = useState(
    "// Type C# Code Below\n" +
      "namespace HelloWorld\n" +
      "{\n" +
      "    class Hello {         \n" +
      "        static void Main(string[] args)\n" +
      "        {\n" +
      '            System.Console.WriteLine("Hello World!");\n' +
      "        }\n" +
      "    }\n" +
      "}"
  );
  const [output, setOutput] = useState(); // Store the Cpp code output

  //handlers for change file name prompt
  const [isChangeFileNameOpen, setIsChangeFileNameOpen] = useState(false);
  const openPrompt = () => {
    setIsChangeFileNameOpen(true);
  };
  const closePrompt = () => {
    setIsChangeFileNameOpen(false);
  };

  const onChange = React.useCallback((cppVal, viewUpdate) => {
    setCode(cppVal);
  }, []);

  const runCode = () => {
    // Clear the previous output
    setOutput("Executing code🛠️...");
    console.log(code);
    setOutput(code);
  };

  return (
    <>
      <ShowSidebar title="C#" bgColor={"#a1ca72"} />
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
          <ChangeFileName currentName={filename} onClose={closePrompt} />
        )}
        <HStack>
          <ColorModeSwitcher />
          <Button
            colorScheme="blue"
            onClick={() => {
              downloadFile(code, filename);
            }}
          >
            {"Save  "}
            <Icon as={FaSave} />
          </Button>
          <Button colorScheme="green" onClick={runCode}>
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
              <Text>C#</Text>
              <CodeMirror
                value={code}
                height={"calc(100vh - 70px)"}
                extensions={[csharp({ autocomplete: true })]}
                onChange={onChange}
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
                    <Text>Output</Text>
                    <Box border={"1px"} h={200}>
                      <Textarea
                        border={"1px"}
                        resize="none"
                        h="100%"
                        id="ouutput"
                        value={output}
                      />
                    </Box>
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
                        }}
                      >
                        Clear 🧹
                      </Button>
                    </HStack>
                    <Box p={2}></Box>
                    <Text>Custom Input</Text>
                    <Box h={100}>
                      <Textarea border={"1px"} resize="none" h="100%">
                        here
                      </Textarea>
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
