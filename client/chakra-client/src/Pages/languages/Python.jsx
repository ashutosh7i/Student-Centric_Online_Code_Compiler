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
import { ColorModeSwitcher } from "../../components/ColorModeSwitcher";
import ShowSidebar from "../../components/Sidebar/ShowSidebar";
import ChangeFileName from "../../components/ChangeFileName";
//
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
//
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

const layoutCSS = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #ccc",
};

//filename will come form db
const filename = "hello.py";

export default function Python() {
  const [sizes, setSizes] = useState([200, 100, "auto"]);
  const [code, setCode] = useState(
    `# Type Python Code Below\n` + `print("👋🏻Hello, Python🐍")`
  );
  const [output, setOutput] = useState(); // Store the Python code output

  const [scriptLoaded, setScriptLoaded] = useState(false);

  //handlers for change file name prompt
  const [isChangeFileNameOpen, setIsChangeFileNameOpen] = useState(false);
  const openPrompt = () => {
    setIsChangeFileNameOpen(true);
  };
  const closePrompt = () => {
    setIsChangeFileNameOpen(false);
  };

  const onChangeCode = (val, viewUpdate) => {
    setCode(val);
  };

  const loadPyScript = () => {
    if (!scriptLoaded) {
      // Load the PyScript script on the first run
      const pyscriptScript = document.createElement("script");
      pyscriptScript.src = "https://pyscript.net/unstable/pyscript.js";
      pyscriptScript.defer = true;
      document.head.appendChild(pyscriptScript);
      console.log("---------------");
      console.log(pyscriptScript);
      console.log("+++++++++++++++");
      setScriptLoaded(true);
    }
  };

  const runCode = () => {
    loadPyScript();

    // Clear the previous output
    setOutput("Executing code🛠️...");

    // Execute the Python code
    const pyScript = document.createElement("py-script");

    pyScript.textContent = code;

    var out = document.getElementById("ouutput");

    // Append the py-script element to the body
    document.body.appendChild(pyScript);

    // Capture and format the output
    const observer = new MutationObserver(() => {
      const unformattedOutput = document.querySelector(
        "div[class='py-script-output']"
      );
      setOutput(unformattedOutput);
      if (unformattedOutput) {
        const formattedOutput = unformattedOutput.textContent;

        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };
  function PythonCodeEditor({ code, onChangeCode }) {
    return (
      <div
        style={{
          ...layoutCSS,
          background: useColorModeValue("gray.50", "gray.700"),
        }}
      >
        <Box p={5} flex="1" minW="300px">
          <Text>Python</Text>
          <CodeMirror
            value={code}
            height={"calc(100vh - 70px)"}
            extensions={[python({ autocomplete: true })]}
            onChange={onChangeCode}
            theme={useColorModeValue("light", "dark")}
          />
        </Box>
      </div>
    );
  }
  return (
    <>
      <ShowSidebar title="Python" bgColor={"#17aeff"} />
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
          <Button colorScheme="blue">
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
          <PythonCodeEditor code={code} onChangeCode={onChangeCode} />

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
                      >
                        Copy 📋
                      </Button>
                      <Button
                        border={"1px"}
                        w="full"
                        colorScheme="gray"
                        variant="outline"
                        id="textareaa"
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