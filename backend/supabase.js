const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://kuzvzhymxvbwswgdnpcp.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
