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

function ItemTable({ updateVariable, foodFilterFunction, foodSorterFunction }) {
  const [foods, setFoods] = useState(null);

  // Fetch items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/items");
        let foodList = response.data;
        if (foodFilterFunction) {
          foodList = foodList.filter(foodFilterFunction);
        }
        if (foodSorterFunction) {
          foodList = foodList.sort(foodSorterFunction);
        }

        setFoods(foodList);
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
      const dateObj = new Date(date);
      const year = dateObj.getUTCFullYear();
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
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
