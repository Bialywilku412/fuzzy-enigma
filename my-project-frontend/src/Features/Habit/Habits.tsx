import { useEffect, useState } from "react";

import AddHabitForm from "./AddHabitForm";
import HabitsTable from "./HabitsTabel";
import { apiFetch } from "../../api.ts";
import type { Habit } from "../../Types/Habit.ts";

function Habits(){
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchHabits() {
        try {
            const data = await apiFetch("habit");
            setHabits(data);
        } catch (err) {
            console.error(err)
            setError("Could not load habits");
        } finally {
            setLoading(false);
        }
    }

    async function deleteHabit(id: number) {
        try {
            await apiFetch(`habit/${id}`, {
                method: "DELETE"
            });
            await fetchHabits();
        } catch (err) {
            console.error(err);
            setError("Could not delete habit");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHabits();
    }, []);

    if(loading) {
        return <p>loading habits...</p>
    }

    if(error) {
        return <p>{error}</p>
    }

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
