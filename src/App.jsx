import "./App.css";
import { Link, Route, Routes } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "./context/UserContext";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import UsersList from "./pages/UsersList";
import PgList from "./pages/PgList";
import { resetPg } from "./slices/pg-slice";

export default function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, handleLogout, user } = useContext(UserContext);

  return (
    <div>
      <h1> Pg Finder App </h1>

      <ul>
        <li> <Link to="/"> Home </Link> </li>

        { isLoggedIn && (
          <>
            <li> <Link to="/dashboard"> Dashboard </Link> </li>
            <li> <Link to="/account"> Account </Link> </li>
            { (user.role == "admin" || user.role == "owner") && <li> <Link to="/users-list"> List Users </Link> </li> }
            <li> <Link to="/pg-list"> Pg Lists </Link> </li>
            <li> <Link to="/" onClick={() => {
              handleLogout();
              dispatch(resetPg());
            }}> Logout </Link> </li>
          </>
        ) }

        { !isLoggedIn && (
          <>
            <li> <Link to="/register"> Register </Link> </li>
            <li> <Link to="/login"> Login </Link> </li>
          </>
        ) }
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/users-list" element={<UsersList />} />
        <Route path="/pg-list" element={<PgList />} />
      </Routes>

    </div>
  )
}