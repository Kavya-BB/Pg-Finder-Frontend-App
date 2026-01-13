import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../slices/booking-slice";

export default function RoomBooking() {
    const dispatch = useDispatch();
    const { pgId } = useParams();
    const location = useLocation();
    const pg = location.state?.pg;
    const navigate = useNavigate();

    const { data, loading, errors } = useSelector((state) => {
        return state.pg;
    })

    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleBooking = () => {
        if (!selectedRoom) {
            alert("Please select room type");
            return;
        }
        dispatch(createBooking({
            pgId,
            roomType: selectedRoom.roomType,
            duration: 1,
            durationType: "month"
        }))
        .unwrap()
        .then(() => {
            alert("Booking successful 🎉");
            navigate("/user-bookings");
        })
        .catch(err => {
            alert(err?.error || "Booking failed");
        });
    };

    if(loading) {
        return <p> loading... </p>
    }

    if(errors) {
        return <p style={{ color: "red" }}> {errors.error} </p>
    }

    if (!pg) {
        return <p> PG data missing. Please go back and try again. </p>;
    }

    return (
        <div>
            <h1> Select & Book Room </h1>

            { pg?.roomTypes?.map(room => {
                const isSelected = selectedRoom?._id === room._id;

                return (
                    <div
                        key={room._id}
                        style={{
                            border: isSelected ? "2px solid green" : "1px solid #ccc",
                            margin: "10px",
                            padding: "10px",
                            background: isSelected ? "#e6ffe6" : "#fff"
                        }}
                    >
                        <p> Type: {room.roomType} </p>
                        <p> Price: ₹{room.rent} </p>
                        <p> Available: {room.count} </p>

                        <button
                            onClick={() => setSelectedRoom(room)}
                            disabled={room.count === 0 && <p style={{ color: "red" }}>Not Available</p>}
                        >
                            {isSelected ? "Selected" : "Select"}
                        </button>
                    </div>
                );
            })}

            <button onClick={handleBooking}> Book Now </button>

            <div>
                <Link to={`/public-pg/${pg._id}`} state={{ pg }}>
                    <button> Back to Pg </button>
                </Link>
            </div>
        </div>
    )
}