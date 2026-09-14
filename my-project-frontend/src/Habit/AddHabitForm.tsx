import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddHabitForm({ onHabitAdded })
{
    const [newHabit, setNewHabit] = useState({
        name: "",
        category: "",
        description: ""
    });

    function handleSubmit(e) 
    {
        e.preventDefault();

        fetch(`${API_BASE_URL}/habit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHabit)
        })
        .then(response => response.json())
        .then(createdHabit => {
            onHabitAdded();
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={newHabit.name}
                        onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}/>
                </label>

                <label>
                    <input
                        type="text"
                        value={newHabit.category}
                        onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}/>
                </label>

                <label>
                    <input
                        type="text"
                        value={newHabit.description}
                        onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}/>
                </label>

                <input type="submit"/>
            </form>
        </div>
    )
}

export default AddHabitForm;