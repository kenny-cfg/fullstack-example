import mysql, { PoolOptions } from 'mysql2';
import express, { Express, Request, Response } from 'express';
import fetchUser from './fetchUser';
import db from './db/database'
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

app.get('/', async (req: Request, res: Response) => {
  res.send('HELLO');
});

app.get('/api/task', async (req: Request, res: Response) => {
  const [data] = await db().execute('select * from tasks');
  console.log(data);
  res.send(data);
})

app.get('/api/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await fetchUser(id);
  res.json(user);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});