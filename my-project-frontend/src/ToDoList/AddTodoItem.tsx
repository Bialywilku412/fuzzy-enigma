import { useState, type FormEvent } from "react";
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

    function handleSubmit(e: FormEvent<HTMLFormElement>)
    {
        e.preventDefault();

        fetch(`${API_BASE_URL}/TodoItem`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodoItem)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to add todo item: ${response.status}`);
            }

            onTodoItemAdded();
        });
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