import type { TaskWithIdentifier } from "./TaskDashboard"

type Props = {
  task: TaskWithIdentifier
}

export default ({ task }: Props) => {
  return <li>{task.title}</li>
}