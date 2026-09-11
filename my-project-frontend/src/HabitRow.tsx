import { useNavigate } from "react-router-dom";

function HabitRow({id, name, category, description }){
    const navigate = useNavigate();

    function navigateToHabit() {
        navigate(`/habits/${id}`);
    }

    return(
        <tr>
            <td>{name}</td>
            <td>{category}</td>
            <td>{description}</td>
        </tr>
)}

export default HabitRow;