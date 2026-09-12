import Habit from "./Habit";
import Habits from "./Habits"
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

function App()
{
  return(
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Habits />}>
          <Route index element={<Habits />} />
          <Route path="habits" element={<Habits />} />
          <Route path="/habit/:id" element={<Habit />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;