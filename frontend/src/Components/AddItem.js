import React, { useState } from "react";
import axios from "axios";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { accentOne, textColor2 } from "../themeSettings";

function AddItem({ updateFunction }) {
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

  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const addFood = async (newFood) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/items",
        {
          name: newFood.name,
          cost: parseFloat(newFood.cost),
          calories: parseInt(newFood.calories),
          protein: parseInt(newFood.protein),
          carbohydrates: parseInt(newFood.carbohydrates),
          fats: parseInt(newFood.fats),
          servings: parseInt(newFood.servings),
          expiration_date: newFood.expiration_date,
          date_purchased: newFood.date_purchased,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      minWidth={{ base: "80vw", md: "300px" }}
      color={textColor2}
      bg={accentOne}
    >
      <FormControl>
        <Input
          name="name"
          placeholder="Name"
          value={foodData.name}
          onChange={handleChange}
          bg={accentOne}
          color={textColor2}
          borderColor="Black"
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <Input
          name="cost"
          placeholder="Cost"
          value={foodData.cost}
          onChange={handleChange}
          bg={accentOne}
          color={textColor2}
          borderColor="Black"
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <Input
          name="calories"
          placeholder="Calories"
          value={foodData.calories}
          onChange={handleChange}
          bg={accentOne}
          color={textColor2}
          borderColor="Black"
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <Input
          name="protein"
          placeholder="Protein (g)"
          value={foodData.protein}
          onChange={handleChange}
          bg={accentOne}
          color={textColor2}
          borderColor="Black"
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <Input
          name="carbohydrates"
          placeholder="Carbohydrates (g)"
          value={foodData.carbohydrates}
          onChange={handleChange}
          bg={accentOne}
          color={textColor2}
          borderColor="Black"
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <Input
          name="fats"
          placeholder="Fats (g)"
          value={foodData.fats}
          onChange={handleChange}
          bg={accentOne}
          color={textColor2}
          borderColor="Black"
          borderRadius="5px"
          required
        />
      </FormControl>
      <FormControl>
        <Input
          name="servings"
          placeholder="Servings"
          value={foodData.servings}
          onChange={handleChange}
          bg={accentOne}
          color={textColor2}
          borderColor="Black"
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
          bg={accentOne}
          color={textColor2}
          borderColor="Black"
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
          bg={accentOne}
          color={textColor2}
          borderColor="Black"
          borderRadius="5px"
          required
        />
      </FormControl>
      <Button bg={accentOne} type="submit">
        Add Food
      </Button>
    </VStack>
  );
}

export default AddItem;
