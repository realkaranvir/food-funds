const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

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

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("Items").select("*");

  if (error) {
    console.error("Select error: ", error);
    res.status(500).end();
  } else {
    res.status(200).send(data);
  }
});

router.get("/amount-spent", async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const { data, error } = await supabase
      .from("Items")
      .select("*")
      .gte("date_purchased", new Date(startDate).toISOString())
      .lte("date_purchased", new Date(endDate).toISOString());
    let cost = 0;
    data.forEach((item) => {
      cost += parseFloat(item.cost);
    });
    cost = cost.toFixed(2);

    if (error) {
      console.error("Select error: ", error);
      res.status(500).end();
      return;
    } else {
      if (data.length === 0) {
        res.status(200).json({});
      } else {
        res.status(200).json({ cost });
      }
    }
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

router.post("/", async (req, res) => {
  const foodItem = req.body;
  const { error } = await supabase.from("Items").insert(foodItem);

  if (error) {
    res.status(500).end();
  } else {
    res.status(200).end();
    console.log("Successfully inserted data: ", foodItem);
  }
});

module.exports = router;
