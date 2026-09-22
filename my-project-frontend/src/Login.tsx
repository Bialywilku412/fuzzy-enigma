import LoginForm from "./LoginForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login()
{
    async function LogIn(username: string, password: string)
    {
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
        console.log(localStorage.getItem("token"));
    }

    return(
        <LoginForm
            handleLogin={LogIn}
        />
    );
}

export default Login;