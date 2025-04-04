const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDatabase() {
  // Create connection without database selection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
  });

  try {
    // Read SQL file
    const sqlFile = path.join(__dirname, 'init.sql');
    const initSql = fs.readFileSync(sqlFile, 'utf8');

    // Execute SQL statements
    await connection.query(initSql);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

// Run initialization if executed directly
if (require.main === module) {
  initDatabase()
    .then(() => console.log('Database initialization complete'))
    .catch(err => console.error('Database initialization failed:', err));
}

module.exports = initDatabase;
