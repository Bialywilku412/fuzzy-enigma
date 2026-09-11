import { useEffect, useState } from "react";
import AddHabitForm from "./AddHabitForm";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App()
{
  const [habits, setHabits] = useState([]);

  function fetchHabits(){
     fetch(`${API_BASE_URL}/habit`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setHabits(data);
      });
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <><ul>
      {habits.map(habit => (
        <li key={habit.id}>{habit.id} , {habit.name}</li>
      ))}
    </ul><div>
        <AddHabitForm
          onHabitAdded = {fetchHabits}/>
      </div></>
  )
}

export default App;