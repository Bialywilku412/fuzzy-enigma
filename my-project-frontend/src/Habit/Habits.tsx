import { useEffect, useState } from "react";

import AddHabitForm from "./AddHabitForm";
import HabitsTable from "./HabitsTabel";
import { apiFetch } from "../api.ts";

function Habits(){
    const [habits, setHabits] = useState([]);

    async function fetchHabits(){
        const data = await apiFetch("habit")
        setHabits(data);
    }

    async function deleteHabit(id: number){
        await apiFetch(`habit/${id}`, {
            method: "DELETE"
        });

        await fetchHabits();
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
