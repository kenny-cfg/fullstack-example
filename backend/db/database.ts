import mysql, { PoolOptions } from "mysql2";

const access: PoolOptions = {
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'tasks',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const conn = mysql.createPool(access).promise();

const getConnection = () => conn;
export default getConnection;