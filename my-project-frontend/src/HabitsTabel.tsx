import styled from "styled-components";
import HabitRow from "./HabitRow";

const StyledTable = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-rows: min-content;
  min-height: 300px;
`;

function HabitsTable({ habits, onDeleteHabit }) {
    return (
        <StyledTable>
            {habits.map((data) => (
                <HabitRow
                    key={data.id}
                    data={data}
                    onDeleteHabit={onDeleteHabit}
                />
            ))}
        </StyledTable>
    );
}

export default HabitsTable;

