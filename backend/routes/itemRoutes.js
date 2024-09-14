import { Router } from "express";
const router = Router();
import supabase from "../supabase.js";

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

export default router;
