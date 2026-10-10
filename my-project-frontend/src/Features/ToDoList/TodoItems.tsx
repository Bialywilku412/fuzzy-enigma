import { useEffect, useState} from "react";
import AddTodoItemForm from "./AddTodoItem";
import TodoItemsTable from "./TodoItemsTabel";
import { apiFetch } from "../../api";
import type { TodoItem } from "../../Types/TodoItem";

function todoItems(){
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTodoItems = async () => {
        try {
            const data = await apiFetch("TodoItem");
            setTodoItems(data);
        } catch (err) {
            console.error(err);
            setError("Could not load Todo items");
        } finally {
            setLoading(false);
        }
    }

    const deleteTodoItem = async (id: number) => {
        try {
            await apiFetch(`TodoItem/${id}`, {
            method: "DELETE"
        })
        fetchTodoItems();
        } catch (err) {
            console.error(err);
            setError("Could not delete Todo item");
        } finally {
            setLoading(false);
        }
    }

    const putTodoItem = async (id: number) => {
        const item = todoItems?.find(t => t.id === id);
        if (!item) return;

        const updatedItem = { ...item, isDone: !item.isDone};
        
        try {
            await apiFetch(`TodoItem/${id}`, {
                method: "PUT",
                body: JSON.stringify(updatedItem)
            });
            fetchTodoItems();
        } catch (err) {
            console.error(err);
            setError("Could not edit Todo item");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { 
        fetchTodoItems();
    }, [])

    if (loading) {
        return <p>Loading Todo items</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return(
        <>
            <AddTodoItemForm
                onTodoItemAdded={fetchTodoItems}
                setError={setError}
                setLoading={setLoading}
            />
            <TodoItemsTable
                todoItems={todoItems}
                onDeleteTodoItem={deleteTodoItem}
                onUpdateTodoItem={putTodoItem}/>
        </>
    );
};

export default todoItems;
