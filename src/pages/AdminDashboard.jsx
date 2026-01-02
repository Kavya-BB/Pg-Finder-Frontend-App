import { Link } from "react-router-dom";

export default function AdminDashboard() {
        
    return (
        <div style={{ padding: "20px" }}>
            <h1> Admin Dashboard Page </h1>
            <b>Manage Users, Owners and PG Approvals</b>

            <div style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px"
            }}>

                <div style={cardStyle}>
                    <b> Total Users </b>
                    <p> View & manage all registered users </p>
                    <Link to="/users-list" state={{ type: "user" }}>
                        <button style={btnStyle}> Manage Users </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <b> Total Owners </b>
                    <p> View & manage all registered owners </p>
                    <Link to="/users-list" state={{ type: "owner" }}>
                        <button style={btnStyle}> Manage Owners </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <b> Total PGs</b>
                    <p> View & manage PGs submitted by owners </p>
                    <Link to="/pg-list">
                        <button style={btnStyle}> Manage PGs </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <b> Total Bookings </b>
                    <p> View & manage all registered Bookings </p>
                    <Link to="/booking-list">
                        <button style={btnStyle}> Manage Bookings </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <b> Total Payments </b>
                    <p> View all payments </p>
                    <button style={btnStyle}> View Payments </button>
                </div>

                <div style={cardStyle}>
                    <b> Total Ratings </b>
                    <p> View all Ratings for PGs </p>
                    <button style={btnStyle}> View Ratings </button>
                </div>

                <div style={cardStyle}>
                    <b> Reports </b>
                    <p> Analytics & System Reports </p>
                    <button style={btnStyle}> View Reports</button>
                </div>

            </div>
        </div>
    )
}

const cardStyle = {
    width: "300px",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "#f9f9f9"
};

const btnStyle = {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    cursor: "pointer"
};