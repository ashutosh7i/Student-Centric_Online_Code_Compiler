import { Box, Heading, useMediaQuery } from "@chakra-ui/react";

function DesktopOnly() {
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  if (!isLargerThanMD) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>This site should only be used on a Desktop.</Heading>
      </Box>
    );
  }

  return null;
}

export default DesktopOnly;
