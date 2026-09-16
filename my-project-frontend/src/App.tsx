import Habit from "./Habit/Habit";
import Habits from "./Habit/Habits"
import TodoItems from "./ToDoList/TodoItems";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

function App()
{
  return(
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route index element={<Habits />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/habit/:id" element={<Habit />} />

          <Route path="/todo" element={<TodoItems />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;