import Habits from "./Habits"
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

function App()
{
  return(
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route element={<Habits />}>
          <Route index element={<Habits />} />
          <Route path="habits" element={<Habits />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;