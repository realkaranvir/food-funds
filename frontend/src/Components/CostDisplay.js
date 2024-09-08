import React from "react";
import { Flex, Text } from "@chakra-ui/react";

function CostDisplay({ timeFrame }) {
  const amountSpent = 20;

  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      textAlign="center"
    >
      <Text fontSize="2rem" fontWeight="bold">
        You spent ${amountSpent} this {timeFrame} on food
      </Text>
    </Flex>
  );
}

export default CostDisplay;
