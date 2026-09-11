import { useEffect, useState } from "react";
import Habits from "./Habits"
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App()
{
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Habits />}>
          <Route index element={<Habits />} />
          <Route path="missions" element={<Habits />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;