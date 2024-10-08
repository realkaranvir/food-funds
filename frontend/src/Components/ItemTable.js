import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VStack,
  Spinner,
  HStack,
  Text,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import { textColor1, accentTwo, textColor3 } from "../themeSettings";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./ModalComponent";
import AddItem from "./AddItem";

function ItemTable({
  updateVariable,
  foodFilterFunction,
  foodSorterFunction,
  secondTextDisplayFunc,
  updateDashboardFunction,
}) {
  const [foods, setFoods] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("authToken");

  // Fetch items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_LINK}/items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
        <div key={key}>
          <HStack
            width="270px"
            bg={accentTwo}
            padding="4"
            justify="space-between"
            key={key}
            color={textColor1}
            cursor="pointer"
            onClick={onOpen}
          >
            <Text overflow="hidden">{food.name}</Text>
            <Text color={textColor3}>{secondTextDisplayFunc(food)}</Text>
          </HStack>
          <ModalComponent
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            content={
              <AddItem updateFunction={updateDashboardFunction} food={food} />
            }
          />
        </div>
      ))}
    </VStack>
  );
}

export default ItemTable;
