import React, { useState } from "react";
import axios from "axios";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { accentOne, primaryColor, textColor3 } from "../themeSettings";

function AddItem({ updateFunction, food }) {
  const [foodData, setFoodData] = useState({
    name: "",
    cost: "",
    calories: "",
    protein: "",
    carbohydrates: "",
    fats: "",
    servings: "",
    expiration_date: "",
    date_purchased: "",
  });

  if (food) {
    // If an item is already passed in, use that to fill in form for editing
    setFoodData(food);
  }

  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const addFood = async (foodItem) => {
    try {
      if (food) {
        await axios.put(
          "http://localhost:8000/items",
          {
            name: foodItem.name,
            cost: parseFloat(foodItem.cost),
            calories: parseInt(foodItem.calories),
            protein: parseInt(foodItem.protein),
            carbohydrates: parseInt(foodItem.carbohydrates),
            fats: parseInt(foodItem.fats),
            servings: parseInt(foodItem.servings),
            expiration_date: foodItem.expiration_date,
            date_purchased: foodItem.date_purchased,
            id: foodItem.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:8000/items",
          {
            name: foodItem.name,
            cost: parseFloat(foodItem.cost),
            calories: parseInt(foodItem.calories),
            protein: parseInt(foodItem.protein),
            carbohydrates: parseInt(foodItem.carbohydrates),
            fats: parseInt(foodItem.fats),
            servings: parseInt(foodItem.servings),
            expiration_date: foodItem.expiration_date,
            date_purchased: foodItem.date_purchased,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.log("error posting");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const food = { ...foodData, cost: parseFloat(foodData.cost) };
    // Clear form after submission
    setFoodData({
      name: "",
      cost: "",
      calories: "",
      protein: "",
      carbohydrates: "",
      fats: "",
      servings: "",
      expiration_date: "",
      date_purchased: "",
    });
    await addFood(food);
    updateFunction();
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      spacing={1}
      p={4}
      borderRadius="20px"
      borderWidth="3px"
      minWidth={{ base: "80vw", md: "300px" }}
      color={textColor3}
      bg={primaryColor}
    >
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          value={foodData.name}
          onChange={handleChange}
          bg={primaryColor}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Cost</FormLabel>
        <Input
          name="cost"
          value={foodData.cost}
          onChange={handleChange}
          bg={primaryColor}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Calories</FormLabel>
        <Input
          name="calories"
          value={foodData.calories}
          onChange={handleChange}
          bg={primaryColor}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Protein (g)</FormLabel>
        <Input
          name="protein"
          value={foodData.protein}
          onChange={handleChange}
          bg={primaryColor}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Carbohydrates (g)</FormLabel>
        <Input
          name="carbohydrates"
          value={foodData.carbohydrates}
          onChange={handleChange}
          bg={primaryColor}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Fats (g)</FormLabel>
        <Input
          name="fats"
          value={foodData.fats}
          onChange={handleChange}
          bg={primaryColor}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>Servings</FormLabel>
        <Input
          name="servings"
          value={foodData.servings}
          onChange={handleChange}
          bg={primaryColor}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Expiration Date</FormLabel>
        <Input
          type="date"
          name="expiration_date"
          value={foodData.expiration_date}
          onChange={handleChange}
          bg={primaryColor}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Purchase Date</FormLabel>
        <Input
          type="date"
          name="date_purchased"
          value={foodData.date_purchased}
          onChange={handleChange}
          bg={primaryColor}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <Button
        bg={primaryColor}
        color={textColor3}
        borderRadius="20px"
        borderWidth="3px"
        borderColor={accentOne}
        type="submit"
      >
        Add Food
      </Button>
    </VStack>
  );
}

export default AddItem;
