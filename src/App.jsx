import "./App.css";
import { Link, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import UsersList from "./pages/UsersList";
import PgList from "./pages/PgList";
import PGDetails from "./pages/PGDetails";
import PgForm from "./pages/PgForm";
import EditPg from "./pages/EditPg";
import PublicPg from "./pages/PublicPg";
import EditProfile from "./pages/EditProfile";
import BookingList from "./pages/BookingList";
import OwnerBookings from "./pages/OwnerBookings";
import UserBookings from "./pages/UserBookings";
import RoomBooking from "./pages/RoomBooking";
import RatingForm from "./pages/RatingForm";
import RatingsList from "./pages/RatingsList";
import OwnerRating from "./pages/OwnerRating";
import AdminRating from "./pages/AdminRating";
import PaymentsList from "./pages/PaymentsList";
import PaymentSuccess from "./pages/PaymentSuccess";
import NearByPgs from "./pages/NearByPgs";
import { resetPg } from "./slices/pg-slice";
import { resetUser } from "./slices/user-slice";
import { fetchPgData, fetchPublicPgData, setSearchText } from "./slices/pg-slice";

export default function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, handleLogout, user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);

  const handleLiveSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchText(value));
    if (!value.trim()) {
      navigate(lastPathRef.current);
      return;
    }
    if (location.pathname !== "/pg-list") {
      lastPathRef.current = location.pathname;
    }
    navigate("/pg-list");
  };

  useEffect(() => {
    if (!user) return;
    if(user.role == "admin" || user.role == "owner") {
      dispatch(fetchPgData());
    } else if(user.role == "user") {
      dispatch(fetchPublicPgData());
    }
  }, [dispatch, user]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="brand">🏠 PG Finder</h1>
      </header>

      <nav className="navbar">
        <ul className="nav-links">
          <li> <Link to="/"> Home </Link> </li>

          { isLoggedIn && (
            <>
              <input
                type="text"
                placeholder="Search PG by name or location..."
                onChange={handleLiveSearch}
                className="pg-live-search"
              />
              <li> <Link to="/dashboard"> Dashboard </Link> </li>
              <li> <Link to="/account"> Account </Link> </li>
              { (user.role == "admin" || user.role == "owner") && <li> <Link to="/users-list"> List Users </Link> </li> }
              <li> <Link to="/pg-list"> Pg Lists </Link> </li>
              {(user.role != "user") && <li> <Link to="/pg-details/:id"> Pg Details </Link> </li>}
              { (user.role == "owner") && <li> <Link to="/pg-form"> Add PG </Link> </li> }
              { (user.role == "owner") && <li> <Link to="/edit-pg/:id"> Edit PG </Link> </li> }
              { (user.role == "user") && <li> <Link to="/public-pg/:id"> Public PG Page </Link> </li> }
              <li> <Link to={`/edit-profile/${user._id}`}> Edit My Profile </Link> </li>
              { (user.role == "admin") && <li> <Link to="/booking-list"> Booking List </Link> </li> }
              { (user.role == "owner") && <li> <Link to="/owner-bookings"> Owner Bookings </Link> </li> }
              { (user.role == "user") && <li> <Link to="/user-bookings"> User Bookings </Link> </li> }
              { (user.role == "user") && <li> <Link to="/room-bookings/:pgId"> Room Bookings </Link> </li> }
              { (user.role == "user") && <li> <Link to="/pg-ratings/:pgId"> Room Ratings </Link> </li> }
              { (user.role == "user") && <li> <Link to="/my-ratings"> Ratings List </Link> </li> }
              { (user.role == "owner") && <li> <Link to="/owner-ratings"> Owner Ratings </Link> </li> }
              { (user.role == "admin") && <li> <Link to="/admin-ratings"> Admin Ratings </Link> </li> }
              <li> <Link to="/payment-list"> Payments List </Link> </li>
              <li> <Link to="/payment-success"> Payment Success </Link> </li>
              { (user.role == "user") && <li> <Link to="/nearby">NearBy Location</Link> </li>}
              <li> <Link to="/" className="logout-btn" onClick={() => {
                handleLogout();
                dispatch(resetPg());
                dispatch(resetUser());
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
      </nav>
      
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/pg-list" element={<PgList />} />
          <Route path="/pg-details/:id" element={<PGDetails />} />
          <Route path="/pg-form" element={<PgForm />} />
          {/* <Route path="/pg-form/:id" element={<PgForm />} /> */}
          <Route path="/edit-pg/:id" element={<EditPg />} />
          <Route path="/public-pg/:id" element={<PublicPg />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
          <Route path="/booking-list" element={<BookingList />} />
          <Route path="/owner-bookings" element={<OwnerBookings />} />
          <Route path="/user-bookings" element={<UserBookings />} />
          <Route path="/room-bookings/:pgId" element={<RoomBooking />} />
          <Route path="/pg-ratings/:pgId" element={<RatingForm />} />
          <Route path="/my-ratings" element={<RatingsList />} />
          <Route path="/owner-ratings" element={<OwnerRating />} />
          <Route path="/admin-ratings" element={<AdminRating />} />
          <Route path="/payment-list" element={<PaymentsList />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/nearby" element={<NearByPgs />} />
        </Routes>
      </main>

    </div>
  )
}