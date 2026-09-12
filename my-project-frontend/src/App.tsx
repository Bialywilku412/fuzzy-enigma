import { useEffect, useState } from "react";
import Habits from "./Habits"
import Navbar from "./NavBar";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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