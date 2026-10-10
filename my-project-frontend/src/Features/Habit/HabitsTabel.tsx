import styled from "styled-components";
import HabitRow from "./HabitRow";
import type { Habit } from "../../Types/Habit";

const StyledTable = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-rows: min-content;
  min-height: 300px;
`;

type HabitsTabelProps = {
    habits: Habit[];
    onDeleteHabit: (id: number) => void;
}

function HabitsTable({ habits, onDeleteHabit } : HabitsTabelProps) {
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

