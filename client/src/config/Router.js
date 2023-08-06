import React from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import TopBar from "../components/topbar/TopBar";
import Home from "../pages/home/Home";
import Single from "../pages/single/Single";
import Write from "../pages/write/Write";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Update from "../pages/update/Update";
import Category from "../pages/category/Category";
import Author from "../pages/author/Author";
import Setting from '../pages/setting/Setting'
import Search from "../pages/search/Search";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category" element={<Category />} />
        <Route path="/author" element={<Author />} />

        <Route path="/single" element={<Single />} />
        <Route path="/write" element={<PrivateRoute />}>
          <Route path="/write" element={<Write />} />
        </Route>
        <Route path="/settings" element={<PrivateRoute />}>
          <Route path="/settings" element={<Setting />} />
        </Route>

        <Route path="/search/:key" element={<Search/>}/>

        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/update/:postId" element={<Update />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </>
  );
}
