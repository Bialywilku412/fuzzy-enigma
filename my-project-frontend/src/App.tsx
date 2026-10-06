import Habit from "./Features/Habit/Habit";
import Habits from "./Features/Habit/Habits"
import TodoItems from "./Features/ToDoList/TodoItems";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Pomodoro from "./Features/Pomodoro/Pomodoro";
import Login from "./Login";

function App()
{
  return(
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route index element={<Login />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/habit/:id" element={<Habit />} />

          <Route path="/todo" element={<TodoItems />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;