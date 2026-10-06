import { useEffect, useState } from "react";
import type { Habit } from "../../Types/Habit";
import { apiFetch } from "../../api";

import PomodoroModal from "./PomodoroModal";

function Pomodoro() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [formState, setFormState] = useState();

    const [time, setTime] = useState(40 * 60000);
    const [rest, setRest] = useState(10 * 60000);
    const [mode, setMode] = useState("work")
    const [start, setStart] = useState(false);

    const [showModal, setShowModal] = useState(false);

    let seconds = ("0" + (Math.floor((time / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);  
    let hours = ("0" + Math.floor((time / 3600000) % 60)).slice(-2);

    function handleSubmit(e) {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState((prevState) => ({...prevState, [name]: value}))
    }

    async function fetchHabits() {
            try {
                const data = await apiFetch("habit");
                setHabits(data ?? []);
            } catch(err) {
                console.error(err);
                setError("Could not load habits");
            } finally {
                setLoading(false);
            }
            
        }

    function countdown()
    {
        return setInterval(() => {
            setTime(prevTime => (prevTime > 0 ? prevTime - 10 : 0));
        }, 10)
    }

    useEffect(() => {
        fetchHabits();
        let interval = null;

        if(start) {
            interval = countdown();
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }
    },[start])

    useEffect(() => {
        if(time <= 0 && start)
        {
            setStart(false);
            setMode(prevMode => prevMode === "work" ? "rest" : "work");
            setTime(mode === "work" ? rest : 40 * 60000)
            setShowModal(true);
        }
    }, [time]);

    function adjustTimer(input) {

    if (!start) {

        switch (input) {

        case "40:10":

            setTime(prevTime => prevTime = 60000 * 40)
            setRest(prevRest => prevRest = 60000 * 10)

            break;

        case "incSeconds":

            setTime(prevTime => prevTime + 1000)

            break;

        case "decHours":

            setTime(prevTime => prevTime - 3600000)
            break;

        case "decMinutes":

            setTime(prevTime => prevTime - 60000)

            break;

        case "decSeconds":

            setTime(prevTime => prevTime - 1000)

            break;

        default:

            break;

        }

    }

    }

    return (

    <div className="App">

    <PomodoroModal
        show={showModal}
        onClose={() => setShowModal(false)}
        mode={mode}
    />

    <button onClick={() => adjustTimer("40:10")}>40:10</button>

    <button onClick={() => adjustTimer("incHours")}>&#8679;</button>

    <button onClick={() => adjustTimer("40:10")}>&#8679;</button>

    <button onClick={() => adjustTimer("incSeconds")}>&#8679;</button>

    <div>{hours} : {minutes} : {seconds}</div>

    <button onClick={() => adjustTimer("decHours")}>&#8681;</button>

    <button onClick={() => adjustTimer("decMinutes")}>&#8681;</button>

    <button onClick={() => adjustTimer("decSeconds")}>&#8681;</button> <br/><br/>

    <button onClick={() => setStart(true)}>Start</button>

    <button onClick={() => setStart(false)}>Stop</button>

    <button onClick={() => {setStart(false); setTime(0)}}>Reset</button>

    <form>
        <label>What habit:</label>
        <select name="habits">
         {habits.map((data) => (
                <option value={data.name}>{data.name}</option>
            ))}
        </select>
    </form>
    </div>
    );

}

export default Pomodoro;