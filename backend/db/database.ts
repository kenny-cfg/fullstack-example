import mysql, { PoolOptions } from "mysql2";

const access: PoolOptions = {
  host: process.env['database.host'],
  user: process.env['database.user'],
  password: process.env['database.password'],
  database: process.env['database.database'],
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log(access);

const conn = mysql.createPool(access).promise();

const getConnection = () => conn;

export default getConnection;