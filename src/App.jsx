import "./App.css";
import { Link, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import UsersList from "./pages/UsersList";
import PgList from "./pages/PgList";
import PGDetails from "./pages/PGDetails";
import { resetPg } from "./slices/pg-slice";
import { fetchPgData, fetchPublicPgData } from "./slices/pg-slice";

export default function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, handleLogout, user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    if(user.role == "admin" || user.role == "owner") {
      dispatch(fetchPgData());
    } else if(user.role == "user") {
      dispatch(fetchPublicPgData());
    }
  }, [dispatch]);

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
            <li> <Link to="/pg-details/:id"> Pg Details </Link> </li>
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
        <Route path="/pg-details/:id" element={<PGDetails />} />
      </Routes>

    </div>
  )
}