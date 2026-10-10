import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { Habit } from "../../Types/Habit";

const StyledTableRow = styled.div`
  display: grid;
  height: 30px;
  grid-template-columns: 180px 1fr 80px 80px;
  cursor: pointer;
  align-items: center;
  padding: 4px;
  &:hover {
    background-color: lightgray;
  }
`;

const TableCell = styled.div<{ $justifyRight?: boolean }>`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${({ $justifyRight }) =>
    $justifyRight &&
    `
    justify-self: right; 
  `}
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
`;

type HabitRowProps = {
  onDeleteHabit: (id: number) => void;
  data: Habit;
}

function HabitRow({ onDeleteHabit, data: { id, name, category, description } } : HabitRowProps){
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
                <DeleteButton
                  onClick={(e) =>
                    {
                      e.stopPropagation();
                      onDeleteHabit(id)
                    }}
                >
                  Delete
                </DeleteButton>
            </TableCell>
        </StyledTableRow>
)}

export default HabitRow;