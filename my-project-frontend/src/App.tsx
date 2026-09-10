import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App()
{
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/habit`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // ← add this
        setHabits(data);
      });
  }, []);

  return (
    <ul>
      {habits.map(habit => (
        <li key={habit.id}>{habit.id} , {habit.name}</li>
      ))}
    </ul>
  )
}

export default App;