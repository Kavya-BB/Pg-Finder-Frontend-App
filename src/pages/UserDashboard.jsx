import { Link } from "react-router-dom";

export default function UserDashboard() {

    return (
        <div style={{ padding: "20px" }}>
            <h1> User Dashboard Page </h1>
            <b> Find PGs near you and manage your profile </b>

            <div style={gridStyle}>

                <div style={cardStyle}>
                    <h3> Explore PGs </h3>
                    <h2> 🏠 </h2>
                    <p> View all approved PGs </p>
                    <Link to="/pg-list">
                        <button style={btnStyle}> Explore Now </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <h3> Saved PGs </h3>
                    <h2> ❤️ </h2>
                    <p> PGs you saved for later </p>
                    <button style={btnStyle}> View Saved </button>
                </div>

                <div style={cardStyle}>
                    <h3> View Bookings </h3>
                    <h2> 📄 </h2>
                    <p> View or manage your bookings </p>
                    <Link to="/user-bookings">
                        <button style={btnStyle}> My Bookings </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <h3> View Ratings </h3>
                    <h2> ⭐ </h2>
                    <p> Ratings you have given </p>
                    <button style={btnStyle}> My Ratings </button>
                </div> 

                <div style={cardStyle}>
                    <h3> View Payments </h3>
                    <h2> 💳 </h2>
                    <p> View your payment history </p>
                    <button style={btnStyle}> My Payments </button>
                </div>

                <div style={cardStyle}>
                    <h3> Profile </h3>
                    <h2> 👤 </h2>
                    <p> Update personal details </p>
                    <Link to="/account">
                        <button style={btnStyle}> My Profile </button>
                    </Link>
                </div>     

            </div>

        </div>
    )
}

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px"
};

const cardStyle = {
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "#f9f9f9",
    textAlign: "center"
};

const btnStyle = {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    cursor: "pointer"
};
