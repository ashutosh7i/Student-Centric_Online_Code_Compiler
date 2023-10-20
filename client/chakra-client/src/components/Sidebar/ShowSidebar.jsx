import React, { useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ShowSidebar = ({ title, bgColor }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = { navigation: "drawer", navigationButton: true };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Sidebar
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <Box ml={!variants?.navigationButton && 200}>
        <Header
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
          title={title} // Pass the title as a prop to the Header
          bgColor={bgColor}
        />
      </Box>
    </>
  );
};

export default ShowSidebar;
