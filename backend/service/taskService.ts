import { RowDataPacket } from 'mysql2'
import db from '../db/database'

type Task = {
  title: string,
  completed: boolean
}

type TaskWithIdentifier = Task & {
  id: number
}

const toTask = (raw: RowDataPacket): Task => ({
  title: raw.title as string,
  completed: raw.completed as boolean
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

export default {
  getAll,
  getSingle
}