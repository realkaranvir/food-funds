import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { accentOne, accentTwo, textColor2 } from "../themeSettings";

function DashboardSection({ titlesArray, Contents }) {
  return (
    <Box
      width={{ base: "80vw", md: "300px" }}
      height={{ base: "80vw", md: "300px" }}
      bg={accentOne}
      overflowY="auto" // Enable vertical scrolling
      overflowX="hidden" // Disable horizontal scrolling
      borderRadius="20px"
      position="relative"
    >
      {titlesArray && (
        <Flex
          justify="space-between"
          align="center"
          color={textColor2}
          position="sticky"
          zIndex="1000"
          bg={accentTwo}
          paddingLeft="10px"
          paddingRight="10px"
          top="0"
          left="0"
          marginBottom="10px"
        >
          {titlesArray.map((title, key) => (
            <Text>{title}</Text>
          ))}
        </Flex>
      )}
      {Contents}
    </Box>
  );
}

export default DashboardSection;
