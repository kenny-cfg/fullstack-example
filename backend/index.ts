import express, { Express, Request, Response } from 'express';
import fetchUser from './fetchUser';
import cors from 'cors';
import 'dotenv/config';
import taskService, { Task } from './service/taskService';

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const extractNumericId = (req: Request): number | undefined => {
  const idRaw = req.params.id as string;
  const id = parseInt(idRaw);
  if (!Number.isInteger(id)) {
    return undefined;
  }
  return id;
}

app.get('/', async (req: Request, res: Response) => {
  res.send('HELLO');
});

app.get('/api/task', async (req: Request, res: Response) => {
  res.send(await taskService.getAll());
})

app.get('/api/task/:id', async (req: Request, res: Response) => {
  const id = extractNumericId(req);
  if (id === undefined) {
    res.status(400).send('Supplied ID is not a number');
    return;
  }
  const task = await taskService.getSingle(id);
  if (task === undefined) {
    res.status(404).send('Task not found');
    return;
  }
  res.send(task)
})

app.post('/api/task', async (req: Request, res: Response) => {
  const newTaskRaw = req.body;
  if (typeof newTaskRaw.title !== 'string') {
    res.status(400).send('Title must be string');
    return;
  }
  if (typeof newTaskRaw.completed !== 'boolean') {
    res.status(400).send('Completed must be boolean');
    return;
  }
  const task = newTaskRaw as Task;
  const result = await taskService.create(task);
  res.send(result);
})

app.put('/api/task/:id', async (req: Request, res: Response) => {
  const id = extractNumericId(req);
  if (id === undefined) {
    res.status(400).send('Supplied ID is not a number');
    return;
  }
  const updateRaw = req.body;
  if (updateRaw.title !== undefined && typeof updateRaw.title !== 'string') {
    res.status(400).send('Title must be a string');
    return;
  }
  if (updateRaw.completed !== undefined && typeof updateRaw.completed !== 'boolean') {
    res.status(400).send('Completed must be boolean');
    return;
  }
  const update = updateRaw as Partial<Task>;
  const result = await taskService.update(id, update);
  res.send(result);
})

app.get('/api/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await fetchUser(id);
  res.json(user);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});