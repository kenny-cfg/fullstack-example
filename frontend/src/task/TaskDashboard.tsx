import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"

export type Task = {
  title: string,
  completed: boolean
}

export type TaskWithIdentifier = Task & {
  id: number
}

export default () => {
  const [tasks, setTasks] = useState<TaskWithIdentifier[] | undefined>();

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await fetch('/api/task');
      const tasks = await result.json();
      setTasks(tasks)
    }
    fetchTasks();
  })

  const handleDelete = (task: TaskWithIdentifier) => {
    setTasks(currentTasks => currentTasks?.filter(it => it.id !== task.id))
  }

  return <>
    <p>TASKS</p>
    <ul>
      {tasks?.map(task => <TaskCard onDelete={() => handleDelete(task)} task={task} />)}
    </ul>
  </>
}