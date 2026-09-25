import { useState, type FormEvent } from "react";
import { apiFetch } from "../api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type AddTodoItemFormProps = {
    onTodoItemAdded: () => void;
};

function AddTodoItemForm({ onTodoItemAdded }: AddTodoItemFormProps){
    const [newTodoItem, setNewTodoItem] = useState({
        name: "",
        date: new Date(),
        isDone: false
    });

    async function handleSubmit(e: FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        
        await apiFetch(
            "TodoItem",
            {
               method: "POST",
               body: JSON.stringify(newTodoItem)
            }
        )

        onTodoItemAdded();
    };

    return(
        <>
            <section>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            value={newTodoItem.name}
                            onChange={(e) => setNewTodoItem({ ...newTodoItem, name: e.target.value })}
                            />
                    </label>
                    <input type="submit"></input>
                </form>
            </section>
        </>
    );
}

export default AddTodoItemForm;