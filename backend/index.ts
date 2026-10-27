import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/users/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.send('DONE')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});