import { useId, useState } from "react";

type User = {
  id: number;
  name: string;
  bio: string;
  lastLogin: string;
}

const UserFetchExample = () => {
  const id = useId();
  const [userId, setUserId] = useState<number | undefined>()
  const [user, setUser] = useState<User | undefined>()

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json() as User;
    if (typeof result.id !== 'number') {
      throw new Error('id not a number');
    }
    if (typeof result.name !== 'string') {
      throw new Error('name is not a string');
    }
    if (typeof result.bio !== 'string') {
      throw new Error('bio is not a string');
    }
    if (typeof result.lastLogin !== 'string') {
      throw new Error('lastLogin is not a string')
    }
    setUser(result);
  }

  return <div >
    <label htmlFor={id}>ID</label>
    <input id={id} onChange={e => {
      setUserId(parseInt(e.target.value))
    }} type="number" />
    <button onClick={fetchUser}>Fetch user with ID {userId}</button>
    <p>{JSON.stringify(user)}</p>
  </div>
}

export default UserFetchExample;