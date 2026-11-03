import { useEffect, useState } from "react"

type Task = {
  title: string,
  completed: boolean
}

type TaskWithIdentifier = Task & {
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

  return <>
    <p>TASKS</p>
    <ul>
      {tasks?.map(task => <li>{task.title}</li>)}
    </ul>
  </>
}