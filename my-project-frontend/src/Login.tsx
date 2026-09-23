import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login()
{
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");
    async function LogIn(username: string, password: string)
    {
        try{
            const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login: username, password })
        });

        if (!response.ok)
        {
            throw new Error("Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);

        setErrorMessage("");
        navigate("/habits");

        } catch(error) {
            setErrorMessage("login in failed, try again");
        }
    }

    return(
        <>
            <LoginForm
                handleLogin={LogIn}
            />
            {errorMessage}
        </>
    );
}

export default Login;