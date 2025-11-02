import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres.fwowhpltadsyznrksqly',
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  database: 'postgres',
  password: 'kjXiAZgwbzOnn8LI',
  port: 6543, 
});

export default pool;
