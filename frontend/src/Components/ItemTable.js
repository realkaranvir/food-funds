import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function ItemTable() {
  const [foods, setFoods] = useState([]);

  // Fetch items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/items");
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

  // Sort the foods by expiration date
  foods.sort(
    (foodOne, foodTwo) => foodOne.expirationDate > foodTwo.expirationDate
  );

  return (
    <VStack>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Calories</Th>
              <Th>Protein (g)</Th>
              <Th>Carbs (g)</Th>
              <Th>Fats (g)</Th>
              <Th>Expiration Date</Th>
              <Th>Purchase Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {foods.map((food, index) => (
              <Tr key={index}>
                <Td>{food.name}</Td>
                <Td>${food.price.toFixed(2)}</Td>
                <Td>{food.calories}</Td>
                <Td>{food.protein}</Td>
                <Td>{food.carbs}</Td>
                <Td>{food.fats}</Td>
                <Td>{food.expirationDate}</Td>
                <Td>{food.purchaseDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default ItemTable;
