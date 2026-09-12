import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HabitRow from "./HabitRow";

const StyledTable = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-rows: min-content;
  min-height: 300px;
`;

function HabitsTable({ habits }) {
    return (
        <StyledTable>
            {habits.map((data) => (
                <HabitRow key={data.id} data={data} />
            ))}
        </StyledTable>
    );
}

export default HabitsTable;

