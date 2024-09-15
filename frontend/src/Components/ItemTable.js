import React, { useState, useEffect } from "react";
import axios from "axios";
import { VStack, Spinner, HStack, Text, Flex } from "@chakra-ui/react";

import {
  primaryColor,
  textColor1,
  accentTwo,
  accentOne,
  textColor3,
} from "../themeSettings";
import { useNavigate } from "react-router-dom";

function ItemTable({
  updateVariable,
  foodFilterFunction,
  foodSorterFunction,
  secondTextDisplayFunc,
}) {
  const [foods, setFoods] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // Fetch items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("an unexpected error occurred: ", error);
        }
      }
    };

    fetchItems();
  }, [updateVariable, foodFilterFunction, foodSorterFunction, token, navigate]);

  if (foods === null) {
    return (
      <Flex justify="center" align="center" width="100%" height="100%">
        <Spinner boxSize="75px" />
      </Flex>
    );
  } else if (foods.length === 0) {
    return (
      <Flex
        justify="center"
        align="center"
        textAlign="center"
        color={accentTwo}
      >
        No Data
      </Flex>
    );
  }

  return (
    <VStack>
      {foods.map((food, key) => (
        <HStack
          width="290px"
          bg={primaryColor}
          padding="4"
          borderRadius="20px"
          justify="space-between"
          key={key}
          color={textColor1}
          cursor="pointer"
        >
          <Text overflow="hidden">{food.name}</Text>
          <Text color={textColor3}>{secondTextDisplayFunc(food)}</Text>
        </HStack>
      ))}
    </VStack>
  );
}

export default ItemTable;
