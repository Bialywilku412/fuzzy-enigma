import TodoItemRow from "./TodoItemRow";
import styled from "styled-components";

const StyledTable = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-rows: min-content;
  min-height: 300px;
`;

function TodoItemsTable({ todoItems, onDeleteTodoItem, onUpdateTodoItem }) {
    return(
        <StyledTable>
            {todoItems.map((data) => (
                <TodoItemRow
                    key={data.id}
                    data={data}
                    onDeleteTodoItem={onDeleteTodoItem}
                    onUpdateTodoItem={onUpdateTodoItem}
                />
            ))}
        </StyledTable>
    );
}

export default TodoItemsTable;