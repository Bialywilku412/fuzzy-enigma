import { useEffect, useState } from "react";

import AddHabitForm from "./AddHabitForm";
import HabitsTable from "./HabitsTabel"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Habits(){
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
        <HabitsTable habits={habits} />
        <AddHabitForm onHabitAdded = {fetchHabits}/>
        </>
    )
}

export default Habits;
