type User = {
  id: number;
  name: string;
  bio: string;
  lastLogin: string;
}

const fetchUser = async (id: string): Promise<User> => {
  const idNumber = parseInt(id);
  if (Number.isNaN(idNumber)) {
    throw new Error('Supplied ID is not a number');
  }
  return {
    id: idNumber,
    name: 'Kenny',
    bio: 'He\'s fabulous',
    lastLogin: 'today'
  }
}

export default fetchUser;