import { useEffect, useState } from "react";

import AddHabitForm from "./AddHabitForm";
import HabitsTable from "./HabitsTabel"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Habits(){
    const [habits, setHabits] = useState([]);

    async function fetchHabits(){
        const response = await fetch(`${API_BASE_URL}/habit`)
        const data = await response.json();
        setHabits(data);
    }

    async function deleteHabit(id){
        const response = await fetch(`${API_BASE_URL}/habit/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchHabits();
        }
    }

    useEffect(() => {
        fetchHabits();
    }, []);

    return (
        <>
        <HabitsTable
            habits={habits}
            onDeleteHabit={deleteHabit}
        />
        <AddHabitForm onHabitAdded = {fetchHabits}/>
        </>
    )
}

export default Habits;
