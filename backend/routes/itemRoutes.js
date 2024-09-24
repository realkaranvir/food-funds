const { Router } = require("express");
const router = Router();
const supabase = require("../supabase.js");
const { verifyToken } = require("../jwt.js");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const decodeTokenFromRequest = (req) => {
  // return the decoded token if it's valid, null otherwise

  // Checks if the correct authorization headers are submitted with the request
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  try {
    const token = authHeader.split(" ")[1]; //Extracts token from the Authorization header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    console.error("JWT error: ", error);
    return null;
  }
};

router.get("/", verifyToken, async (req, res) => {
  try {
    const decodedToken = decodeTokenFromRequest(req);

    const { data, error } = await supabase
      .from("Items")
      .select("*")
      .eq("user_id", decodedToken.user_id);

    if (error) {
      console.error("Select error: ", error);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(200).send(data);
    }
  } catch (err) {
    console.error("Error fetching items: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/amount-spent",
  [
    verifyToken,
    check("startDate").isISO8601().withMessage("Invalid startDate format"),
    check("endDate").isISO8601().withMessage("Invalid endDate format"),
  ],
  async (req, res) => {
    // Sanitize inputs check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { startDate, endDate } = req.query;
    try {
      const decodedToken = decodeTokenFromRequest(req);

      const { data, error } = await supabase
        .from("Items")
        .select("*")
        .eq("user_id", decodedToken.user_id)
        .gte("date_purchased", new Date(startDate).toISOString())
        .lte("date_purchased", new Date(endDate).toISOString());
      let cost = 0;
      data.forEach((item) => {
        cost += parseFloat(item.cost);
      });
      cost = cost.toFixed(2);

      if (error) {
        console.error("Select error: ", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
      } else {
        if (data.length === 0) {
          res.status(200).json({});
        } else {
          res.status(200).json({ cost });
        }
      }
    } catch (err) {
      console.error("Error getting amount spent: ", err);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

router.post(
  "/",
  [
    verifyToken,
    check("name").not().isEmpty().trim().escape(),
    check("cost").isNumeric().withMessage("Cost must be a number"),
    check("date_purchased")
      .isISO8601()
      .toDate()
      .withMessage("Invalid date format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const foodItem = req.body;
    try {
      const decodedToken = decodeTokenFromRequest(req);
      foodItem.user_id = decodedToken.user_id;

      const { error } = await supabase.from("Items").insert(foodItem);

      if (error) {
        console.error("Error inserting data: ", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Successfully inserted data" });
    } catch (err) {
      console.error("Error processing request:", err);
      return res
        .status(500)
        .json({ error: "An internal server error occurred" });
    }
  }
);

module.exports = router;
