export default function UserDashboard() {

    return (
        <div style={{ padding: "20px" }}>
            <h1> User Dashboard Page </h1>
            <b> Find PGs near you and manage your profile </b>

            <div style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px"
            }}>

            <div style={cardStyle}>
                <b> Explore PGs </b>
                <p> View all approved PGs </p>
                <button style={btnStyle}> Explore Now </button>
            </div>

            <div style={cardStyle}>
                <b> Saved PGs </b>
                <p> See PGs you saved for later </p>
                <button style={btnStyle}> View Saved </button>
            </div>

            <div style={cardStyle}>
                <b> view bookings </b>
                <p> View my booking/Make new bookings </p>
                <button style={btnStyle}> My Bookings </button>
            </div>

            <div style={cardStyle}>
                <b> Add ratings </b>
                <p> View my ratings for PGs </p>
                <button style={btnStyle}> My Ratings </button>
            </div>

            <div style={cardStyle}>
                <b> Make payments </b>
                <p> View my payments for PGs </p>
                <button style={btnStyle}> My Payments </button>
            </div>

            <div style={cardStyle}>
                <b> My Profile </b>
                <p> Update your personal details </p>
                <button style={btnStyle}> Edit Profile </button>
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


            {/* <p> <b> Total Pgs - { data.length } </b> </p>

            {
                data.map((ele) => (
                    <div key={ele._id}>
                        <p> <strong>PG Name:</strong> { ele.pgname } </p>
                        <p> <strong>Location:</strong> { ele.location?.address } </p>
                        <p> <strong>RoomTypes:</strong> {ele.roomTypes
                                ?.map((room) => `${room.roomType} (₹${room.rent})`)
                                .join(", ")}
                        </p>
                        <p> <strong>Description:</strong> { ele.description } </p>
                        <p> <strong>Amenities:</strong> { ele.amenities?.join(', ') } </p>
                        <p><strong>Rating:</strong> ⭐ {ele.rating}</p>
                        <img src={ele.pgPhotos?.[0]} alt={ele.pgname} />
                    </div>
                ))
            } */}