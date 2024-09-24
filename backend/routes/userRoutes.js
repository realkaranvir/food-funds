const { Router } = require("express");
const router = Router();
const supabase = require("../supabase.js");
const bcrypt = require("bcryptjs");
const { signToken, verifyToken } = require("../jwt.js");
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    check("username")
      .isAlphanumeric()
      .withMessage("Username must be alphanumeric"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    check("email_address").isEmail().withMessage("Invalid email address"),
    check("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Name is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, name, email_address } = req.body;
    try {
      const hash = await bcrypt.hash(password, 14);

      const { error: insertError } = await supabase.from("Users").insert({
        username: username,
        password: hash,
        name: name,
        email_address: email_address,
      });

      if (insertError) {
        console.error("Error: ", insertError);
        return res.status(500).json({ message: "Error inserting user" });
      }

      const { data: user, selectError } = await supabase
        .from("Users")
        .select("*")
        .eq("username", username)
        .single();

      if (selectError) {
        console.error("Error: ", selectError);
        return res.status(500).json({ message: "Error selecting user" });
      }

      const jwtData = {
        user_id: user.user_id,
        username: user.username,
        name: user.name,
      };

      const token = signToken(jwtData, "30d");

      return res
        .status(200)
        .json({ message: "User created successfully", token: token });
    } catch (err) {
      console.error("Error during signup: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  [
    check("username").isAlphanumeric().withMessage("Invalid username"),
    check("password").not().isEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      const { data: user, error } = await supabase
        .from("Users")
        .select("*")
        .eq("username", username)
        .single();

      if (!user) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });
      }

      const jwtData = {
        user_id: user.user_id,
        username: user.username,
        name: user.name,
      };
      const token = signToken(jwtData, "30d");

      if (error) {
        console.error("Error: ", error);
        return res.status(500).json({ message: "Error logging in" });
      }
      return res
        .status(200)
        .json({ message: "User logged in successfully", token: token });
    } catch (err) {
      console.error("Error during login: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
