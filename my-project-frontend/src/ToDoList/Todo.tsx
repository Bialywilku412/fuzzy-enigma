import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Todo(){
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        const response = await fetch(`${API_BASE_URL}/todo`);
        const data = await response.json();
        setTodos(data);
    }

    const deleteTodo = async (id) => {
        const response = await fetch(`{API_BASE_URL}/todo/${id}` ,{
            method: `DELETE`
        });
        if(response.ok){
            fetchTodos();
        }
    }
};
