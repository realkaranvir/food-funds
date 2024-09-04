import React from "react";
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

const foods = [
  {
    name: "Apple",
    purchaseDate: "2024-09-03",
    expirationDate: "2024-09-10",
    price: 1.2, // in USD
    calories: 95,
    protein: 0.5, // in grams
    carbs: 25, // in grams
    fats: 0.3, // in grams
  },
  {
    name: "Chicken Breast",
    purchaseDate: "2024-09-02",
    expirationDate: "2024-09-07",
    price: 3.5, // in USD per 100g
    calories: 165,
    protein: 31, // in grams
    carbs: 0, // in grams
    fats: 3.6, // in grams
  },
  {
    name: "Banana",
    purchaseDate: "2024-09-03",
    expirationDate: "2024-09-12",
    price: 0.5, // in USD
    calories: 105,
    protein: 1.3, // in grams
    carbs: 27, // in grams
    fats: 0.4, // in grams
  },
  {
    name: "Greek Yogurt",
    purchaseDate: "2024-09-01",
    expirationDate: "2024-09-15",
    price: 1.0, // in USD per serving
    calories: 100,
    protein: 10, // in grams
    carbs: 6, // in grams
    fats: 0.7, // in grams
  },
  {
    name: "Whole Grain Bread",
    purchaseDate: "2024-09-03",
    expirationDate: "2024-09-08",
    price: 2.5, // in USD per loaf
    calories: 70,
    protein: 3, // in grams
    carbs: 12, // in grams
    fats: 1.0, // in grams
  },
  {
    name: "Almonds",
    purchaseDate: "2024-09-01",
    expirationDate: "2024-12-01",
    price: 8.0, // in USD per 100g
    calories: 575,
    protein: 21, // in grams
    carbs: 22, // in grams
    fats: 49, // in grams
  },
];

function HomePage() {
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default HomePage;
