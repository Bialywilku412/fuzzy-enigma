import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddHabitForm from "./AddHabitForm";
import HabitRow from "./HabitRow";
import HabitsTable from "./HabitsTabel"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Habits(){
    const [habits, setHabits] = useState([]);

    const navigate = useNavigate();

    function navigateToHabit() {
        navigate(`/habits/${id}`);
    }

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
