import express, { Express, Request, Response } from 'express';
import fetchUser from './fetchUser';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await fetchUser(id);
  res.json(user);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});