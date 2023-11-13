import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminHome from "./pages/AdminHome";

import Ayarlar from "./pages/Ayarlar";
import AdminSidebar from "./layout/AdminSidebar";
import React, { useEffect } from "react";

import { setToken, setUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Book from "./pages/Book";
import Video from "./pages/Video";
import AddBook from "./pages/AddBook";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  const storedToken = localStorage.getItem("jwt");
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    if (storedToken) dispatch(setToken(storedToken));
    if (storedUser) dispatch(setUser(storedUser));
  }, [dispatch, storedToken, storedUser]);

  return (
    <>
      {isAuth ? (
        <Router>
          <AdminSidebar />
          <div className="ml-56 pt-6 flex flex-1 overflow-x-auto">
            <Routes>
              <Route>
                <Route index element={<AdminHome />} />
                <Route path="Book" element={<Book />} />
                <Route path="Video" element={<Video />} />
                <Route path="Ayarlar" element={<Ayarlar />} />

                <Route path="AddBook" element={<AddBook />} />
              </Route>
            </Routes>
          </div>
        </Router>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
