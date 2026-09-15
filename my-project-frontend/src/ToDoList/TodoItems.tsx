import { useEffect, useState, type ComponentType } from "react";
import AddTodoItemForm from "./AddTodoItem";

const TodoItemForm = AddTodoItemForm as unknown as ComponentType<{
    onTodoItemAdded: () => void;
}>;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function todoItems(){
    const [todoItems, setTodoItems] = useState([]);

    const fetchTodoItems = async () => {
        const response = await fetch(`${API_BASE_URL}/todo`);
        const data = await response.json();
        setTodoItems(data);
    }

    const deleteTodoItem = async (id) => {
        const response = await fetch(`{API_BASE_URL}/todo/${id}` ,{
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
        </>
    );
};

export default todoItems;
