import React from "react";
import logo from "../Assets/logo_white.png";
import { Img, Flex, Text } from "@chakra-ui/react";
import { primaryColor } from "../themeSettings";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex
      position="sticky"
      zIndex="1000"
      top="0"
      bg={primaryColor}
      justify="space-between"
      align="center"
      p={3}
      width="100vw"
    >
      <Img
        w={{
          base: "150px",
          md: "150px",
        }}
        src={logo}
      />
      <Text
        cursor="pointer"
        fontWeight="bold"
        onClick={() => {
          localStorage.removeItem("authToken");
          navigate("/login");
        }}
      >
        Sign Out
      </Text>
    </Flex>
  );
}

export default Navbar;
