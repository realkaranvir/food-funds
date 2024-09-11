import {
  Box,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
  InputRightElement,
  Button,
  InputGroup,
  Img,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { accentOne, accentTwo, textColor1 } from "../themeSettings";
import logo from "../Assets/logo.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <VStack justify="center" align="center" minHeight="100vh" gap="50px">
      <Img
        src={logo}
        width={{
          base: "70%",
          md: "400px",
        }}
      ></Img>
      <VStack width="250px" gap="25px">
        <Input
          variant="unstyled"
          fontSize="1.25rem"
          color="white"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputGroup size="md">
          <Input
            variant="unstyled"
            type={showPassword ? "text" : "password"}
            fontSize="1.25rem"
            color="white"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputRightElement h="100%">
            <Box
              bg="none"
              color={textColor1}
              onClick={() => {
                setShowPassword(!showPassword); //Toggle visibility of password
              }}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Box>
          </InputRightElement>
        </InputGroup>
      </VStack>
    </VStack>
  );
}

export default Login;
