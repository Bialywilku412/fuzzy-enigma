import styled from "styled-components";

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

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
`;

function TodoItemRow({ onDeleteTodoItem, onUpdateTodoItem, data: {id, name, date, isDone} }){
    return(
        <StyledTableRow>
        <TableCell>{name}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{isDone}</TableCell>
    </StyledTableRow>
    );
}

export default TodoItemRow