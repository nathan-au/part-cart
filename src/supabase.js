import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ylohxwjiqaibrwyauklv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsb2h4d2ppcWFpYnJ3eWF1a2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjM1NzEsImV4cCI6MjA2MTUzOTU3MX0.diqIYm6gpEexyCWb_Ac_EwxhoUbYM5H19leMGw9g6vM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);