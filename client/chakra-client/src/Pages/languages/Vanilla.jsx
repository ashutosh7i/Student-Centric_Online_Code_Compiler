import React, { useState, useEffect } from "react";
//
import { useParams } from "react-router-dom";
import { FaEdit, FaSave, FaPlay } from "react-icons/fa";
//

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
//
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
//
import downloadFile from "../../utils/downloadCodeFile.js";
//
import {
  IconButton,
  Icon,
  Button,
  Box,
  useColorModeValue,
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
//
import ShowSidebar from "../../components/QuickAccess/ShowSidebar.jsx";
import { ColorModeSwitcher } from "../../components/utils/ColorModeSwitcher.jsx";
import ChangeFileName from "../../components/utils/ChangeFileName.jsx";
//
import { useRecoilValue } from "recoil";
import { userState } from "../../state.js";
//
import saveToDB from "../../utils/saveToDB.js";
import readFromDB from "../../utils/readFromDB.js";

export default function Vanilla() {
  const toast = useToast();
  const user = useRecoilValue(userState);

  const [htmlValue, setHtmlValue] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [jsValue, setJsValue] = useState("");

  //get the code from the database
  useEffect(() => {
    // On component mount, read old data and paste it in the textarea
    readFromDB(user.id, filename)
      .then((data) => {
        toast({
          title: "Progress Retried 📚",
          description: "your code as it was last saved",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        if (data !== undefined) {
          const parsedData = JSON.parse(data).data.replace(/\\n/g, "\n");

          const htmlMatch = parsedData.match(/(<head>[\s\S]*?<\/body>)/);
          const cssMatch = parsedData.match(/<style>([\s\S]*?)<\/style>/);
          const jsMatch = parsedData.match(/try {([\s\S]*?)} catch/);

          const html = htmlMatch ? htmlMatch[1].trim() : "";
          const css = cssMatch ? cssMatch[1].trim() : "";
          const js = jsMatch ? jsMatch[1].trim() : "";

          setHtmlValue(html);
          setCssValue(css);
          setJsValue(js);
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
        // setHtmlValue(
        //   `<!-- Type Html Below -->\n<head>\n</head>\n<body>\n<h1>Hello!👋🏻</h1>\n<h2>Welcome to SOC</h2>\n<div id="btn">\n click here\n</div>\n</body>`
        // );
        // setCssValue(
        //   `/* Type Css Below */\nh1{\nfont-family: monospace;\n}\nh2{\ncolor: blue;\nfont-family: sans-serif;\ntext-decoration: underline;\n}\n#btn{\nbackground-color: lightskyblue;\nfont-family: sans-serif;\nwidth: 70px;\npadding: 20px;\n}`
        // );
        // setJsValue(
        //   `// Type Javascript Below\nconst button = document.getElementById("btn");\nbutton.addEventListener("click", () => {\nalert("Yes, this works too! 🚀✨");\n});`
        // );
      });
    // setCode(`${readFromDB(user.id)}`);
  }, []);

  const { userId, codeId } = useParams();
  let filename = codeId;
  //console.log(codeId);

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

  // // handler for incoming html code
  // const [htmlValue, setHtmlValue] = useState(
  //   `<!-- Type Html Below -->\n` +
  //     `<head>\n` +
  //     `</head>\n` +
  //     `<body>\n` +
  //     `  <h1>Hello!👋🏻</h1>\n` +
  //     `  <h2>Welcome to SOC</h2>\n` +
  //     `  <div id="btn">\n` +
  //     `    click here\n` +
  //     `  </div>\n` +
  //     `</body>`
  // );
  // const onHtmlChange = React.useCallback((htmlVal, viewUpdate) => {
  //   setHtmlValue(htmlVal);
  // }, []);

  // // handler for incoming css code
  // const [cssValue, setCssValue] = useState(
  //   `/* Type Css Below */\n` +
  //     `h1{\n` +
  //     `  font-family: monospace;\n` +
  //     `}\n` +
  //     `h2{\n` +
  //     `  color: blue;\n` +
  //     `  font-family: sans-serif;\n` +
  //     `  text-decoration: underline;\n` +
  //     `}\n` +
  //     `#btn{\n` +
  //     `  background-color: lightskyblue;\n` +
  //     `  font-family: sans-serif;\n` +
  //     `  width: 70px;\n` +
  //     `  padding: 20px;\n` +
  //     `}`
  // );
  // const onCssChange = React.useCallback((cssVal, viewUpdate) => {
  //   setCssValue(cssVal);
  // }, []);

  // // handler for incoming js code
  // const [jsValue, setJsValue] = useState(
  //   `// Type Javascript Below\n` +
  //     `const button = document.getElementById("btn");\n` +
  //     `button.addEventListener("click", () => {\n` +
  //     `  alert("Yes, this works too! 🚀✨");\n` +
  //     `});`
  // );
  // const onJsChange = React.useCallback((jsVal, viewUpdate) => {
  //   setJsValue(jsVal);
  // }, []);

  // handler for incoming html code
  const onHtmlChange = React.useCallback((htmlVal, viewUpdate) => {
    setHtmlValue(htmlVal);
  }, []);

  // handler for incoming css code
  const onCssChange = React.useCallback((cssVal, viewUpdate) => {
    setCssValue(cssVal);
  }, []);

  // handler for incoming js code
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
          <ChangeFileName
            uid={user.id}
            currentName={filename}
            onClose={closePrompt}
          />
        )}
        <HStack>
          <ColorModeSwitcher />
          <Button
            colorScheme="blue"
            onClick={() => {
              downloadFile(output, filename);
              toast({
                title: "Download Starting",
                description: filename + " is being downloaded",
                status: "info",
                duration: 3000,
                isClosable: true,
              });
              saveToDB(user.id, output, filename)
                .then((message) => {
                  toast({
                    title: "✅Progress Saved💾",
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
            }}
          >
            {"Save  "}
            <Icon as={FaSave} />
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              //creates a new windows with user page
              const newWindow = window.open();
              newWindow.document.write(output);
              toast({
                title: "Opening Preview Window✨",
                description: "Live Rendered Web Preview",
                status: "success",
                duration: 4000,
                isClosable: true,
              });
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
