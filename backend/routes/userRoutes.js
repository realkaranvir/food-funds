import { Router } from "express";
const router = Router();
import supabase from "../supabase.js";
import bcrypt from "bcrypt";

router.post("/signup", async (req, res) => {
  const { username, password, name, email_address } = req.body;
  try {
    const hash = await bcrypt.hash(password, 14);

    const { error } = await supabase.from("Users").insert({
      username: username,
      password: hash,
      name: name,
      email_address: email_address,
    });

    if (error) {
      console.error("Error: ", error);
      return res.status(500).json({ message: "Error inserting user" });
    }
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error during signup: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const { data: user, error } = await supabase
      .from("Users")
      .select("*")
      .eq("username", username)
      .single();

    const isValid = await bcrypt.compare(password, user.password);
    console.log(isValid);

    if (error) {
      console.error("Error: ", error);
      return res.status(500).json({ message: "Error logging in" });
    }
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error during login: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
