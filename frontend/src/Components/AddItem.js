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
  const [foodData, setFoodData] = useState(
    food
      ? food
      : {
          name: "",
          cost: "",
          calories: "",
          protein: "",
          carbohydrates: "",
          fats: "",
          servings: "",
          expiration_date: "",
          date_purchased: "",
        }
  );

  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const addFood = async (foodItem) => {
    // If a food is passed in, modify existing item backend, else create new food item
    try {
      if (food) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_LINK}/items`,
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
          `${process.env.REACT_APP_BACKEND_LINK}/items`,
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
      console.error("error posting: ", error);
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
      borderWidth="3px"
      borderColor={accentOne}
      minWidth="300px"
      color={textColor3}
      bg={primaryColor}
      fontSize="0.5rem"
    >
      <FormControl>
        <FormLabel fontSize="0.8rem">Name</FormLabel>
        <Input
          height="25px"
          name="name"
          value={foodData.name}
          onChange={handleChange}
          bg={accentOne}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="0.8rem">Cost</FormLabel>
        <Input
          height="25px"
          name="cost"
          value={foodData.cost}
          onChange={handleChange}
          bg={accentOne}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="0.8rem">Calories</FormLabel>
        <Input
          height="25px"
          name="calories"
          value={foodData.calories}
          onChange={handleChange}
          bg={accentOne}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="0.8rem">Protein (g)</FormLabel>
        <Input
          height="25px"
          name="protein"
          value={foodData.protein}
          onChange={handleChange}
          bg={accentOne}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="0.8rem">Carbohydrates (g)</FormLabel>
        <Input
          height="25px"
          name="carbohydrates"
          value={foodData.carbohydrates}
          onChange={handleChange}
          bg={accentOne}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="0.8rem">Fats (g)</FormLabel>
        <Input
          height="25px"
          name="fats"
          value={foodData.fats}
          onChange={handleChange}
          bg={accentOne}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel fontSize="0.8rem">Servings</FormLabel>
        <Input
          height="25px"
          name="servings"
          value={foodData.servings}
          onChange={handleChange}
          bg={accentOne}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="0.8rem">Expiration Date</FormLabel>
        <Input
          height="25px"
          type="date"
          name="expiration_date"
          value={foodData.expiration_date}
          onChange={handleChange}
          bg={accentOne}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="0.8rem">Purchase Date</FormLabel>
        <Input
          height="25px"
          type="date"
          name="date_purchased"
          value={foodData.date_purchased}
          onChange={handleChange}
          bg={accentOne}
          color={textColor3}
          borderColor={accentOne}
          borderRadius="5px"
          required
        />
      </FormControl>
      <Button
        bg={primaryColor}
        color={textColor3}
        borderRadius="0"
        borderWidth="3px"
        borderColor={accentOne}
        type="submit"
        fontSize="0.8rem"
      >
        Add Food
      </Button>
    </VStack>
  );
}

export default AddItem;
