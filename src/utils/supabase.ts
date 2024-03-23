import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';

const supabaseUrl = 'https://dsztoeptipeuvfptogyk.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
