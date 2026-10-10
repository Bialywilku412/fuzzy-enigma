import TodoItemRow from "./TodoItemRow";
import styled from "styled-components";
import type { TodoItem } from "../../Types/TodoItem";

const StyledTable = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-rows: min-content;
  min-height: 300px;
`;

type TodoItemTableProps = {
    todoItems: TodoItem[];
    onDeleteTodoItem: (id: number) => void;
    onUpdateTodoItem: (id: number) => void;
}

function TodoItemsTable({ todoItems, onDeleteTodoItem, onUpdateTodoItem } : TodoItemTableProps) {
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