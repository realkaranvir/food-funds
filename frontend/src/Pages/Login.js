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
import { LoginPageModes } from "../Enums";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState(LoginPageModes.LOG_IN);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email_address: "",
    name: "",
  });

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/signup",
        formData
      );
    } catch (error) {
      console.log("Error signing up: ", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        formData
      );
    } catch (error) {
      console.log("Error logging in: ", error);
    }
  };

  const handleChange = (e) => {
    // For updating the form as you type
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
          // Username
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
            // Password
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
              cursor="pointer"
              color={textColor1}
              onClick={() => {
                setShowPassword(!showPassword); //Toggle visibility of password
              }}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Box>
          </InputRightElement>
        </InputGroup>

        {loginMode === LoginPageModes.LOG_IN && (
          // If in login mode
          <>
            <Button onClick={handleLogin}>Log in</Button>
            <Text
              align="center"
              onClick={() => {
                setLoginMode(LoginPageModes.SIGN_UP);
                // Reset form data when switching between login and signup
                setFormData({
                  username: "",
                  password: "",
                  email_address: "",
                  name: "",
                });
              }}
              color="white"
              cursor="pointer"
            >
              Don't have an account?
              <Text fontWeight="bold">Sign up</Text>
            </Text>
          </>
        )}
        {loginMode === LoginPageModes.SIGN_UP && (
          // If in signup mode
          <>
            <Input
              variant="unstyled"
              fontSize="1.25rem"
              color="white"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              variant="unstyled"
              fontSize="1.25rem"
              color="white"
              placeholder="Email"
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
            />

            <Button onClick={handleSignup}>Sign Up</Button>
          </>
        )}
        {loginMode === LoginPageModes.SIGN_UP && (
          <Text
            onClick={() => {
              setLoginMode(LoginPageModes.LOG_IN);
              // Reset form data when switching between login and signup
              setFormData({
                username: "",
                password: "",
                email_address: "",
                name: "",
              });
            }}
            color="white"
            cursor="pointer"
            align="center"
          >
            Already have an account?
            <Text fontWeight="bold">Log in</Text>
          </Text>
        )}
      </VStack>
    </VStack>
  );
}

export default Login;
