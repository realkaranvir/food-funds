import React from "react";
import logo from "../Assets/logo.png";
import { Img, Flex } from "@chakra-ui/react";
import { accentOne, primaryColor, textColor2 } from "../themeSettings";

function Navbar() {
  return (
    <Flex
      position="fixed"
      zIndex="1000"
      top="0"
      bg={primaryColor}
      w="100vw"
      justify="center"
      p={3}
    >
      <Img
        w={{
          base: "300px",
          md: "150px",
        }}
        src={logo}
      />
    </Flex>
  );
}

export default Navbar;
