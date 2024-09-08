import React, { useState, useEffect } from "react";
import axios from "axios";
import { VStack, Box, Spinner, HStack, Text, Flex } from "@chakra-ui/react";
import {
  primaryColor,
  accentOne,
  textColor1,
  textColor2,
} from "../themeSettings";

function ItemTable() {
  const [foods, setFoods] = useState(null);

  // Fetch items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/items");
        console.log(response.data);
        const sortedFoods = response.data.sort(
          (foodOne, foodTwo) =>
            new Date(foodOne.expirationDate) - new Date(foodTwo.expirationDate)
        );
        setFoods(sortedFoods); // Update state with sorted data
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  if (foods === null) {
    return (
      <div>
        <Spinner boxSize="75px" />
      </div>
    );
  }

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
        >
          <Text>{food.name}</Text>
          <Text>{food.expiration_date}</Text>
        </HStack>
      ))}
    </VStack>
  );
}

export default ItemTable;
