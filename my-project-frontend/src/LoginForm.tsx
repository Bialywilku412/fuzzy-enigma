import { useState } from "react";

type LoginFormProps = {
    handleLogin: (username: string, password: string) => Promise<void>;
};

function LoginForm({ handleLogin }: LoginFormProps)
{
    const [newLogin, setNewLogin] = useState({
        username: "",
        password: ""
    });

    return(
        <>
            <section>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    void handleLogin(newLogin.username, newLogin.password);
                }}>
                    <label>
                        <input
                            type="text"
                            value={newLogin.username}
                            onChange={(e) => setNewLogin({ ...newLogin, username: e.target.value })}
                            />
                    </label>
                    <label>
                        <input
                            type="password"
                            value={newLogin.password}
                            onChange={(e) => setNewLogin({ ...newLogin, password: e.target.value })}
                            />
                        </label>
                    <input type="submit"></input>
                </form>
            </section>
        </>
    );
}

export default LoginForm;
