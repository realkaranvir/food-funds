const { createClient } = require("@supabase/supabase-js");

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseUrl = "https://kuzvzhymxvbwswgdnpcp.supabase.co";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
