const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: true,
      },
    });

    await connection.ping();

    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error.message);
  }
};

module.exports = connectDB;
