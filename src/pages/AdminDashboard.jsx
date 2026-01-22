import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
        
    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1> Admin Dashboard </h1>
                <b>Manage Users, Owners and PG Approvals</b>
            </div>

                <div className="admin-grid">

                    <div className="admin-card">
                        <h3> Total Users </h3>
                        <p> View & manage all registered users </p>
                        <Link to="/users-list" state={{ type: "user" }}>
                            <button className="btn primary"> Manage Users </button>
                        </Link>
                    </div>

                    <div className="admin-card">
                        <h3> Total Owners </h3>
                        <p> View & manage PG owners </p>
                        <Link to="/users-list" state={{ type: "owner" }}>
                            <button className="btn primary"> Manage Owners </button>
                        </Link>
                    </div>

                    <div className="admin-card">
                        <h3> Total PGs</h3>
                        <p> Approve & manage PG listings </p>
                        <Link to="/pg-list">
                            <button className="btn primary"> Manage PGs </button>
                        </Link>
                    </div>

                    <div className="admin-card">
                        <h3> Total Bookings </h3>
                        <p> View & manage all Bookings </p>
                        <Link to="/booking-list">
                            <button className="btn primary"> Manage Bookings </button>
                        </Link>
                    </div>

                    <div className="admin-card">
                        <h3> Total Payments </h3>
                        <p> View all payments </p>
                        <button className="btn secondary"> View Payments </button>
                    </div>

                    <div className="admin-card">
                        <h3> Total Ratings </h3>
                        <p> View all Ratings for PGs </p>
                        <Link to="/admin-ratings">
                            <button className="btn primary"> View Ratings </button>
                        </Link>
                    </div>

                    <div className="admin-card highlight">
                        <h3> Reports </h3>
                        <p> Analytics & System Reports </p>
                        <button className="btn secondary"> View Reports</button>
                    </div>

            </div>
        </div>
    )
}