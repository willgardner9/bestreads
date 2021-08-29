import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://hjecbonywzqdxflalnxo.supabase.co";
const supabaseKey = process.env.supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
