import "./Navbar.css";

function Navbar(){
    return(
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    Home
                </a>
            </div>
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                        <a href="/habits">Habits</a>
                    </li>
                    <li>
                        <a href="/pomodoro">Pomodoro</a>
                    </li>
                    <li>
                        <a href="/todo">Todo List</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <a href="/account" className="user-icon">
                    <i className="fas fa-user"></i>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;