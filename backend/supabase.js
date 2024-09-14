import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseUrl = "https://kuzvzhymxvbwswgdnpcp.supabase.co";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
