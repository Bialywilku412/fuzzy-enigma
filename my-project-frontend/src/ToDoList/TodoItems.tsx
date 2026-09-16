import { useEffect, useState} from "react";
import AddTodoItemForm from "./AddTodoItem";
import TodoItemsTable from "./TodoItemsTabel";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function todoItems(){
    const [todoItems, setTodoItems] = useState([]);

    const fetchTodoItems = async () => {
        const response = await fetch(`${API_BASE_URL}/TodoItem`);
        const data = await response.json();
        setTodoItems(data);
    }

    const deleteTodoItem = async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/TodoItem/${id}` ,{
            method: `DELETE`
        });
        if(response.ok){
            fetchTodoItems();
        }
    }

    useEffect(() => { 
        fetchTodoItems();
    }, [])

    return(
        <>
            <AddTodoItemForm
                onTodoItemAdded={fetchTodoItems}
            />
            <TodoItemsTable
                todoItems={todoItems}
                onDeleteTodoItem={deleteTodoItem}
                onUpdateTodoItem={deleteTodoItem}/>
        </>
    );
};

export default todoItems;
