import React, { useState, useEffect } from "react";
import axios from "axios";
import { VStack, Spinner, HStack, Text, Flex } from "@chakra-ui/react";

import { primaryColor, textColor1, accentTwo } from "../themeSettings";
import { useNavigate } from "react-router-dom";

function ItemTable({ updateVariable, foodFilterFunction, foodSorterFunction }) {
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
  }, [updateVariable, foodFilterFunction, foodSorterFunction, token]);

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
          minWidth="200px"
          maxWidth="200px"
          bg={primaryColor}
          padding="4"
          borderRadius="20px"
          justify="space-between"
          key={key}
          color={textColor1}
          cursor="pointer"
        >
          <Text overflow="hidden">{food.name}</Text>
          <Text>{getExpiration(food.expiration_date)}</Text>
        </HStack>
      ))}
    </VStack>
  );
}

export default ItemTable;
