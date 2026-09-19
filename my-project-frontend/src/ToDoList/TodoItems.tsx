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

    const putTodoItem = async (id: number) => {
        const item = todoItems.find(t => t.id === id);
        if (!item) return;

        const updatedItem = { ...item, isDone: !item.isDone};

        const response = await fetch(`${API_BASE_URL}/TodoItem/${id}` ,{
            method: `PUT`,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedItem)
        });

        if (response.ok) {
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
                onUpdateTodoItem={putTodoItem}/>
        </>
    );
};

export default todoItems;
