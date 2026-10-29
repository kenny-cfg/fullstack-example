import express, { Express, Request, Response } from 'express';
import fetchUser from './fetchUser';
import cors from 'cors';
import 'dotenv/config';
import db from './db/database'
import { RowDataPacket } from 'mysql2';

const app: Express = express();
app.use(cors());
const port = 3000;

app.get('/', async (req: Request, res: Response) => {
  res.send('HELLO');
});

app.get('/api/task', async (req: Request, res: Response) => {
  const [data] = await db().execute('select * from tasks');
  res.send(data);
})

app.get('/api/task/:id', async (req: Request, res: Response) => {
  const idRaw = req.params.id as string;
  const id = parseInt(idRaw);
  if (!Number.isInteger(id)) {
    res.status(400).send('Supplied ID is not a number');
    return;
  }
  const [data] = await db().execute<RowDataPacket[]>('select * from tasks where id = ?', [id]);
  if (data.length === 0) {
    res.status(404).send('Task not found');
    return;
  }
  const response = data[0];
  res.send(response)
})

app.get('/api/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await fetchUser(id);
  res.json(user);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});