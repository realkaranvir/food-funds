import React, { useState } from "react";
import axios from "axios";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function AddItem() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const addFood = async (newFood) => {
    try {
      const response = await axios.post("http://localhost:8000/items", {
        name: newFood.name,
        cost: parseFloat(newFood.cost),
        calories: parseInt(newFood.calories),
        protein: parseInt(newFood.protein),
        carbohydrates: parseInt(newFood.carbohydrates),
        fats: parseInt(newFood.fats),
        servings: parseInt(newFood.servings),
        expiration_date: newFood.expiration_date,
        date_purchased: newFood.date_purchased,
      });
      console.log("Food item added:", response.data);
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
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} w="full">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          value={foodData.name}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Cost</FormLabel>
        <Input
          name="cost"
          value={foodData.cost}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Calories</FormLabel>
        <Input
          name="calories"
          value={foodData.calories}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Protein (g)</FormLabel>
        <Input
          name="protein"
          value={foodData.protein}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Carbohydrates (g)</FormLabel>
        <Input
          name="carbohydrates"
          value={foodData.carbohydrates}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Fats (g)</FormLabel>
        <Input
          name="fats"
          value={foodData.fats}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Servings</FormLabel>
        <Input
          name="servings"
          value={foodData.servings}
          onChange={handleChange}
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
          required
        />
      </FormControl>
      <Button type="submit">Add Food</Button>
    </VStack>
  );
}

export default AddItem;
