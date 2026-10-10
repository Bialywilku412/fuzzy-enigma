import styled from "styled-components";
import type { TodoItem } from "../../Types/TodoItem";

const StyledTableRow = styled.div<{ $isDone: boolean }>`
  display: grid;
  height: 30px;
  grid-template-columns: 180px 1fr 80px;
  cursor: pointer;
  align-items: center;
  padding: 4px;
  text-decoration: ${({ $isDone }) => ($isDone ? "line-through" : "none")};
  opacity: ${({ $isDone }) => ($isDone ? 0.5 : 1)};
  &:hover {
    background-color: lightgray;
  }
`;

const TableCell = styled.div<{$justifyRight?: boolean}>`
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

type TodoItemRowProps = {
  onDeleteTodoItem: (id: number) => void;
  onUpdateTodoItem: (id: number) => void;
  data: TodoItem;
}

function TodoItemRow({ onDeleteTodoItem, onUpdateTodoItem, data: {id, name, date, isDone} } : TodoItemRowProps){
    return(
      <StyledTableRow 
        $isDone={isDone}
        onClick={() => onUpdateTodoItem(id)}
      >
        <TableCell>{name}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>
          <DeleteButton
            onClick={(e) =>
              {
                e.stopPropagation();
                onDeleteTodoItem(id);
              }}
          >
            Delete
          </DeleteButton>
        </TableCell>
      </StyledTableRow>
    );
}

export default TodoItemRow