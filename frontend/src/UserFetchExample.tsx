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
  const [fetchStatus, setFetchStatus] = useState<'loading' | 'error' | User | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        setFetchStatus('error')
        return;
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
      setFetchStatus(result)
    }
    setFetchStatus('loading')
    fetchUser();
  }, [userId])
  
  switch (fetchStatus) {
    case 'loading':
      return <p>...LOADING</p>
    case 'error':
      return <p>OH NO!</p>
    case undefined:
      return <p>INITIALIZING</p>
    default:
      return <p>{JSON.stringify(fetchStatus)}</p>
  }
}

export default UserFetchExample;