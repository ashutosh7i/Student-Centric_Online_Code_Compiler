import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaPlay } from "react-icons/fa";
//
import {
  IconButton,
  Icon,
  Button,
  Box,
  useColorModeValue,
  Text,
  HStack,
} from "@chakra-ui/react";
//
import ShowSidebar from "../../components/Sidebar/ShowSidebar.jsx";
import { ColorModeSwitcher } from "../../components/ColorModeSwitcher.jsx";
import ChangeFileName from "../../components/ChangeFileName.jsx";
//
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
//
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

export default function Vanilla() {
  const [sizes, setSizes] = useState([33.33, 33.33, 33.33]);
  const [output, setOutput] = useState(""); // Store the rendered output

  //handlers for change file name prompt
  const [isChangeFileNameOpen, setIsChangeFileNameOpen] = useState(false);
  const openPrompt = () => {
    setIsChangeFileNameOpen(true);
  };
  const closePrompt = () => {
    setIsChangeFileNameOpen(false);
  };

  const layoutCSS = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
  };

  // handler for incoming html code
  const [htmlValue, setHtmlValue] = useState(
    `<!-- Type Html Below -->\n` +
      `<head>\n` +
      `</head>\n` +
      `<body>\n` +
      `  <h1>Hello!👋🏻</h1>\n` +
      `  <h2>Welcome to SOC</h2>\n` +
      `  <div id="btn">\n` +
      `    click here\n` +
      `  </div>\n` +
      `</body>`
  );
  const onHtmlChange = React.useCallback((htmlVal, viewUpdate) => {
    setHtmlValue(htmlVal);
  }, []);

  // handler for incoming css code
  const [cssValue, setCssValue] = useState(
    `/* Type Css Below */\n` +
      `h1{\n` +
      `  font-family: monospace;\n` +
      `}\n` +
      `h2{\n` +
      `  color: blue;\n` +
      `  font-family: sans-serif;\n` +
      `  text-decoration: underline;\n` +
      `}\n` +
      `#btn{\n` +
      `  background-color: lightskyblue;\n` +
      `  font-family: sans-serif;\n` +
      `  width: 70px;\n` +
      `  padding: 20px;\n` +
      `}`
  );
  const onCssChange = React.useCallback((cssVal, viewUpdate) => {
    setCssValue(cssVal);
  }, []);

  // handler for incoming js code
  const [jsValue, setJsValue] = useState(
    `// Type Javascript Below\n` +
      `const button = document.getElementById("btn");\n` +
      `button.addEventListener("click", () => {\n` +
      `  alert("Yes, this works too! 🚀✨");\n` +
      `});`
  );
  const onJsChange = React.useCallback((jsVal, viewUpdate) => {
    setJsValue(jsVal);
  }, []);

  const blockHeight = layoutCSS.height;

  useEffect(() => {
    // Create a live rendered output
    const htmlCode = htmlValue;
    const cssCode = cssValue;
    const javascriptCode = jsValue;

    // Wrap the JavaScript code in a try-catch block
    const wrappedJavaScriptCode = `
      try {
        ${javascriptCode}
      } catch (error) {
        console.error(error);
      }
    `;

    const text = `
      ${htmlCode}
      <style>${cssCode}</style>
      <script>${wrappedJavaScriptCode}</script>
    `;

    setOutput(text);
  }, [htmlValue, cssValue, jsValue]);

  //file name which will come form db
  let filename = "Testfile";
  return (
    <>
      <ShowSidebar title="Web Dev" bgColor={"#ffae17"} />
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
          <Button
            colorScheme="green"
            onClick={() => {
              //creates a new windows with user page
              const newWindow = window.open();
              newWindow.document.write(output);
            }}
          >
            <Icon as={FaPlay} />
            {"Run "}
          </Button>
        </HStack>
      </HStack>

      {/* Code Input Div */}
      <div style={{ height: 400, padding: 20, backgroundColor: "gray" }}>
        <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
          <Pane minSize={200} maxSize="50%">
            <div
              style={{
                ...layoutCSS,
                background: "orange",
                border: "2px solid #ccc",
              }}
            >
              <Box flex="1" minW="300px">
                <Text>Html-</Text>
                <CodeMirror
                  value={htmlValue}
                  height={blockHeight}
                  extensions={[html({ selfClosingTags: true })]}
                  onChange={onHtmlChange}
                  theme={useColorModeValue("light", "dark")}
                />
              </Box>
            </div>
          </Pane>
          <Pane minSize={200} maxSize="50%">
            <div
              style={{
                ...layoutCSS,
                background: "teal",
                border: "2px solid #ccc",
              }}
            >
              <Box flex="1" minW="300px">
                <Text>Css-</Text>
                <CodeMirror
                  value={cssValue}
                  height={blockHeight}
                  extensions={[css({ autocomplete: true })]}
                  onChange={onCssChange}
                  theme={useColorModeValue("light", "dark")}
                />
              </Box>
            </div>
          </Pane>
          <Pane minSize={200} maxSize="50%">
            <div
              style={{
                ...layoutCSS,
                background: "yellow",
                border: "2px solid #ccc",
              }}
            >
              <Box flex="1" minW="300px">
                <Text>Javascript-</Text>
                <CodeMirror
                  value={jsValue}
                  height={blockHeight}
                  extensions={[javascript({ jsx: true, autocomplete: true })]}
                  onChange={onJsChange}
                  theme={useColorModeValue("light", "dark")}
                />
              </Box>
            </div>
          </Pane>
        </SplitPane>
        <br />
        <Box>
          <Box backgroundColor={"yellow"} color={"black"}>
            {" "}
            Preview Below-
          </Box>

          {/* Rendered Output */}
          <iframe
            title="output-iframe"
            srcDoc={output}
            width="100%"
            height="400"
          />
        </Box>
      </div>
    </>
  );
}
