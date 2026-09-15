import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddTodoItemForm({ onTodoItemAdded }){
    const [newTodoItem, setNewTodoItem] = useState({
        name: "",
        date: new Date(),
        isDone: false
    });

    const handleSubmit((e) =>{
        e.preventDefault();

        fetch(`${API_BASE_URL}/todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodoItem)
        })
        .then(response => response.json())
        .then(createdTodoItem =>{
            onTodoItemAdded(createdTodoItem)
        })
    })
}

export default AddTodoItemForm;