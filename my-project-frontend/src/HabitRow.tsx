import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

const StyledTableRow = styled.div`
  display: grid;
  height: 30px;
  grid-template-columns: 180px 1fr 80px;
  cursor: pointer;
  align-items: center;
  padding: 4px;
  &:hover {
    background-color: lightgray;
  }
`;

const TableCell = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${({ justifyRight }) =>
    justifyRight &&
    `
    justify-self: right; 
  `}
`;

function HabitRow({ data: { id, name, category, description } }){
    const navigate = useNavigate();

    function navigateToHabit() {
        navigate(`/habit/${id}`);
    }

    return(
        <StyledTableRow onClick={navigateToHabit}>
            <TableCell> {name} </TableCell>
            <TableCell> {category} </TableCell>
            <TableCell> {description} </TableCell>
            <TableCell>
                <button>
                    Delete
                </button>
            </TableCell>
        </StyledTableRow>
)}

export default HabitRow;