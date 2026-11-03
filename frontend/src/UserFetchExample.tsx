import { useEffect, useId, useState } from "react";

type User = {
  id: number;
  name: string;
  bio: string;
  lastLogin: string;
}

type Props = {
  userId: number
}

const UserFetchExample = ({ userId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
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
      setLoading(false);
    }
    setLoading(true)
    fetchUser();
  }, [userId])
  
  if (loading) {
    return <p>...LOADING</p>
  }

  return <div >
    <p>{JSON.stringify(user)}</p>
  </div>
}

export default UserFetchExample;