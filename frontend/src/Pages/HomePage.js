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
    price: 1.2,
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fats: 0.3,
  },
  {
    name: "Chicken Breast",
    purchaseDate: "2024-09-02",
    expirationDate: "2024-09-07",
    price: 3.5,
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
  },
  {
    name: "Banana",
    purchaseDate: "2024-09-03",
    expirationDate: "2024-09-12",
    price: 0.5,
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fats: 0.4,
  },
  {
    name: "Greek Yogurt",
    purchaseDate: "2024-09-01",
    expirationDate: "2024-09-15",
    price: 1.0,
    calories: 100,
    protein: 10,
    carbs: 6,
    fats: 0.7,
  },
  {
    name: "Whole Grain Bread",
    purchaseDate: "2024-09-03",
    expirationDate: "2024-09-08",
    price: 2.5,
    calories: 70,
    protein: 3,
    carbs: 12,
    fats: 1.0,
  },
  {
    name: "Almonds",
    purchaseDate: "2024-09-01",
    expirationDate: "2024-12-01",
    price: 8.0,
    calories: 575,
    protein: 21,
    carbs: 22,
    fats: 49,
  },
];

function HomePage() {
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

export default HomePage;
