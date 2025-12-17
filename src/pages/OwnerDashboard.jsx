export default function OwnerBookings() {
    
    return (
        <div style={{ padding: "20px" }}>
            <h1> Owner Bookings Page </h1>
            <b>Manage your PG properties and their approvals</b>

            <div style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px"
            }}>

                <div style={cardStyle}>
                    <b> My PGs </b>
                    <p> View all PGs you added </p>
                    <button style={btnStyle}> View My PGs </button>
                </div>

                <div style={cardStyle}>
                    <b> Add & edit PG </b>
                    <p> Add or Edit PG property </p>
                    <button style={btnStyle}> Ada/Edit PG </button>
                </div>

                <div style={cardStyle}>
                    <b> Pending Approvals </b>
                    <p> Verify status of your PG approvals </p>
                    <button style={btnStyle}> Check Status </button>
                </div>

                <div style={cardStyle}>
                    <b> View Bookings </b>
                    <p> View bookings for my PGs </p>
                    <button style={btnStyle}> Check Bookings </button>
                </div>

                <div style={cardStyle}>
                    <b> View Pendings </b>
                    <p> View bookings pending for my PGs </p>
                    <button style={btnStyle}> Pending Bookings </button>
                </div>

                <div style={cardStyle}>
                    <b> Total Earnings </b>
                    <p> View payment info related to my PGs </p>
                    <button style={btnStyle}> View Earnings </button>
                </div>

                <div style={cardStyle}>
                    <b> Total Ratings </b>
                    <p> View ratings for my PGs </p>
                    <button style={btnStyle}> Ratings received </button>
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
