import { useId, useState } from "react";

const UserFetchExample = () => {
  const id = useId();
  const [userId, setUserId] = useState<number | undefined>()

  return <div >
    <label htmlFor={id}>ID</label>
    <input id={id} onChange={e => {
      setUserId(parseInt(e.target.value))
    }} type="number" />
    <button>Fetch user with ID {userId}</button>
  </div>
}

export default UserFetchExample;