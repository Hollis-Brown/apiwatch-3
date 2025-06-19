require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .single();
    
    if (error) throw error;
    console.log('✅ Supabase connection successful!');
    console.log('User count:', data.count);
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
  }
}

testConnection(); 