import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VStack,
  Box,
  Spinner,
  HStack,
  Text,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import {
  primaryColor,
  accentOne,
  textColor1,
  textColor2,
} from "../themeSettings";

function ItemTable({ updateVariable }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [foods, setFoods] = useState(null);

  // Fetch items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/items");
        const sortedFoods = response.data.sort(
          (foodOne, foodTwo) =>
            new Date(foodOne.expiration_date) -
            new Date(foodTwo.expiration_date)
        );
        setFoods(sortedFoods);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [updateVariable]);

  if (foods === null) {
    return (
      <Flex justify="center" align="center" width="100%" height="100%">
        <Spinner boxSize="75px" />
      </Flex>
    );
  }

  const getExpiration = (date) => {
    if (!date) {
      return "No Date";
    } else {
      return new Date(date).toLocaleDateString();
    }
  };

  return (
    <VStack>
      {foods.map((food, key) => (
        <HStack
          width={{ base: "70vw", md: "280px" }}
          height={{ base: "10vw", md: "35px" }}
          bg={primaryColor}
          padding="4"
          borderRadius="20px"
          justify="space-between"
          key={key}
          color={textColor1}
          cursor="pointer"
        >
          <Text>{food.name}</Text>
          <Text>{getExpiration(food.expiration_date)}</Text>
        </HStack>
      ))}
    </VStack>
  );
}

export default ItemTable;
