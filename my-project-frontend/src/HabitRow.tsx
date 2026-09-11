function HabitRow({ name, category, description }){
    return(
        <tr>
            <td>{name}</td>
            <td>{category}</td>
            <td>{description}</td>
        </tr>
)}

export default HabitRow;