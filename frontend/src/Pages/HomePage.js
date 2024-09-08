import React from "react";
import ItemTable from "../Components/ItemTable";
import AddItem from "../Components/AddItem";
import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import {
  primaryColor,
  accentOne,
  textColor2,
  accentTwo,
} from "../themeSettings";

function HomePage() {
  return (
    <VStack p={2} bg={primaryColor}>
      <Box
        width={{ base: "80vw", md: "300px" }}
        height={{ base: "80vw", md: "300px" }}
        bg={accentOne}
        overflowY="auto" // Enable vertical scrolling
        overflowX="hidden" // Disable horizontal scrolling
        borderRadius="20px"
        position="relative"
      >
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
          <Text>Name</Text>
          <Text>Expiration</Text>
        </Flex>
        <ItemTable />
      </Box>

      <AddItem />
    </VStack>
  );
}

export default HomePage;
