import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { accentOne, accentTwo, textColor2 } from "../themeSettings";

function DashboardSection({ title, Contents }) {
  return (
    <Box
      width="300px"
      height="300px"
      bg={accentOne}
      overflowY="auto" // Enable vertical scrolling
      overflowX="hidden" // Disable horizontal scrolling
      borderRadius="20px"
      position="relative"
    >
      {title && (
        <Flex
          justify="center"
          align="center"
          textAlign="center"
          color={textColor2}
          bg={accentOne}
          position="sticky"
          zIndex="1000"
          top="0"
          left="0"
        >
          <Text fontSize="2rem" fontWeight="bold">
            {title}
          </Text>
        </Flex>
      )}
      {Contents}
    </Box>
  );
}

export default DashboardSection;
