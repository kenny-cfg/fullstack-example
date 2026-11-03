import type { TaskWithIdentifier } from "./TaskDashboard"

type Props = {
  task: TaskWithIdentifier;
  onDelete: () => void;
}

export default ({ onDelete, task }: Props) => {
  const handleDelete = async () => {
    const result = await fetch(`/api/task/${task.id}`, {
      method: 'DELETE'
    })
    if (result.status === 204) {
      onDelete()
    }
  }

  return <li>{task.title} <button onClick={handleDelete}>x</button></li>
}