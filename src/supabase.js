import { createClient } from '@supabase/supabase-js'

require('dotenv').config();
const supabaseKey = process.env.SUPABASE_KEY;

const supabaseUrl = 'https://iiiudsurjuqeoysyuiug.supabase.co'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;