import { useState, type FormEvent } from "react";
import { apiFetch } from "../api";

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

    async function handleSubmit(e: FormEvent<HTMLFormElement>) 
    {
        e.preventDefault();

        await apiFetch("habit", {
            method: "POST",
            body: JSON.stringify(newHabit)
        });
        
        onHabitAdded();
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