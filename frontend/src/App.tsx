import { useId, useState } from "react";
import UserFetchExample from "./UserFetchExample"

const App = () => {
  const id = useId();
  const [userIdOnForm, setUserIdOnForm] = useState<number | undefined>();
  const [userIdSubmitted, setUserIdSubmitted] = useState<number | undefined>();

  return (
    <>
      <img height="100px" width="100px" src="./poo.jpg" />
      {userIdSubmitted !== undefined && <UserFetchExample userId={userIdSubmitted} />}
      <label htmlFor={id}>ID</label>
      <input id={id} onChange={e => setUserIdOnForm(parseInt(e.target.value))} type="number" />
      <button onClick={() => setUserIdSubmitted(userIdOnForm)}>
        Fetch user with ID {userIdOnForm}
      </button>
    </>
  )
}

export default App
