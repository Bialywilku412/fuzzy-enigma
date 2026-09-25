import { useEffect, useState} from "react";
import AddTodoItemForm from "./AddTodoItem";
import TodoItemsTable from "./TodoItemsTabel";
import { apiFetch } from "../api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function todoItems(){
    const [todoItems, setTodoItems] = useState([]);

    const fetchTodoItems = async () => {
        const data = await apiFetch("TodoItem");
        setTodoItems(data);
    }

    const deleteTodoItem = async (id: number) => {
        await apiFetch(`TodoItem/${id}`, {
            method: "DELETE"
        })

        fetchTodoItems();
    }

    const putTodoItem = async (id: number) => {
        const item = todoItems.find(t => t.id === id);
        if (!item) return;

        const updatedItem = { ...item, isDone: !item.isDone};

        await apiFetch(`TodoItem/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedItem)
        });

        fetchTodoItems();
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
