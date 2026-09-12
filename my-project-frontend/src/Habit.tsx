import { useParams } from "react-router-dom";


function Habit() {
    const { id } = useParams();
    console.log(id);
    return(
        <>
            a
        </>
    );
}

export default Habit;