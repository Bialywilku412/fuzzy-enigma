import { useEffect, useState } from "react";
import AddHabitForm from "./AddHabitForm";
import HabitForm from "./HabitForm";
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
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
        </tr>
        {habits.map(habit => (
          <HabitForm
            name={habit.name}
            category={habit.category}
            description={habit.description}
          />
        ))}
      </table>
      <div>
        <AddHabitForm
          onHabitAdded = {fetchHabits}/>
      </div>
    </>
  )
}

export default App;