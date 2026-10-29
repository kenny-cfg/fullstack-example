import { ResultSetHeader, RowDataPacket } from 'mysql2'
import db from '../db/database'

export type Task = {
  title: string,
  completed: boolean
}

type TaskWithIdentifier = Task & {
  id: number
}

const toTask = (raw: RowDataPacket): Task => ({
  title: raw.title as string,
  completed: (raw.completed === 1)
})

const toTaskWithIdentifier = (raw: RowDataPacket): TaskWithIdentifier => ({
  id: raw.id as number,
  title: raw.title as string,
  completed: raw.completed as boolean
})

const getAll = async (): Promise<TaskWithIdentifier[]> => {
  const [data] = await db().execute<RowDataPacket[]>('select * from tasks');
  return data.map(it => toTaskWithIdentifier(it));
}

const getSingle = async (id: number): Promise<Task | undefined> => {
  const [data] = await db().execute<RowDataPacket[]>('select * from tasks where id = ?', [id]);
  if (data.length === 0) {
    return undefined;
  }
  return toTask(data[0]);
}

const create = async (task: Task): Promise<TaskWithIdentifier> => {
  const [data] = await db().execute<ResultSetHeader>('insert into tasks (title, completed) values (?, ?)', [task.title, task.completed])
  const id = data.insertId;
  return {
    id,
    ...task
  }
}

const update = async (id: number, task: Partial<Task>): Promise<Task | undefined> => {
  // TODO: Probably should wrap in a transaction
  const single = await getSingle(id);
  if (single === undefined) {
    return undefined;
  }
  await db().execute(
    'update tasks set title = ?, completed = ? where id = ?',
    [
      task.title ?? single.title,
      task.completed ?? single.completed,
      id
    ]
  )
  console.log({ ...single, ...task })
  return {
    ...single,
    ...task
  }
}

export default {
  getAll,
  getSingle,
  create,
  update
}