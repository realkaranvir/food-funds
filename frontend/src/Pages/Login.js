import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { textColor1 } from "../themeSettings";

function Login() {
  return (
    <Flex justify="center" align="center" minHeight="100vh">
      <HStack color={textColor1} fontWeight="bold" gap="40px">
        <Text>Log In</Text>
        <Text fontSize="2rem">|</Text>
        <Text>Sign Up</Text>
      </HStack>
    </Flex>
  );
}

export default Login;
