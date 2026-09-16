import { useState, type FormEvent } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type AddHabitFormProps = {
    onHabitAdded: () => void;
};

function AddHabitForm({ onHabitAdded }: AddHabitFormProps)
{
    const [newHabit, setNewHabit] = useState({
        name: "",
        category: "",
        description: ""
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>) 
    {
        e.preventDefault();

        fetch(`${API_BASE_URL}/habit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHabit)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to add habit: ${response.status}`);
            }

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