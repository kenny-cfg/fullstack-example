import mysql, { PoolOptions } from 'mysql2';
import express, { Express, Request, Response } from 'express';
import fetchUser from './fetchUser';
import cors from 'cors';

const app: Express = express();
app.use(cors());
const port = 3000;

const access: PoolOptions = {
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'tasks',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const conn = mysql.createPool(access);

app.get('/', async (req: Request, res: Response) => {
  const result = await conn.promise().execute('SELECT 1 + 1 AS `test`;');
  res.send(result);
});

app.get('/api/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await fetchUser(id);
  res.json(user);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});