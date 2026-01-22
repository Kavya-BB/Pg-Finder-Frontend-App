import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../slices/booking-slice";
import { createPayment } from "../slices/payment-slice";
import razorpayCheckout from "../utils/razorpayCheckout";
import "../styles/RoomBooking.css";

export default function RoomBooking() {
    const [paying, setPaying] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const dispatch = useDispatch();
    const { pgId } = useParams();
    const location = useLocation();
    const pg = location.state?.pg;
    const navigate = useNavigate();

    const bookings = useSelector(state => state.booking.data);

    const handleBooking = () => {
        if (!selectedRoom) {
            alert("Please select room type");
            return;
        }
        setPaying(true);
        dispatch(createBooking({
            pgId,
            roomType: selectedRoom.roomType,
            duration: 1,
            durationType: "month"
        }))
        .unwrap()
        .then(res => {
            return dispatch(createPayment({
                amount: selectedRoom.rent,
                bookingId: res.booking._id
            })).unwrap();
        })
        .then(paymentData => {
            razorpayCheckout({
                key: paymentData.key,
                order: paymentData.order,
                navigate,
                onClose: () => setPaying(false)
            });
        })
        .catch(err => {
            alert(err?.error || "Booking failed");
            setPaying(false);
        });
    };

    if (!pg) {
        return <p>PG data missing</p>;
    }

    return (
        <div className="booking-page">
            <h1>Select & Book Room</h1>

            <div className="room-grid">
                { pg.roomTypes.map(room => {
                    const isSelected = selectedRoom?._id === room._id;

                    return (
                        <div key={room._id} 
                            className={`room-card ${isSelected ? "selected" : ""} ${room.count === 0 ? "disabled" : ""}`}>
                            <h3>{room.roomType}</h3>
                            <p className="price">₹{room.rent} / month</p>
                            <p className="availability">
                                {room.count > 0 ? `${room.count} rooms available` : "Sold Out"}
                            </p>

                            <button
                                onClick={() => setSelectedRoom(room)}
                                disabled={room.count === 0}
                            >
                                {isSelected ? "Selected ✓" : "Select Room"}
                            </button>
                        </div>
                    );
                })}
            </div>

            <button className="pay-btn" onClick={handleBooking} disabled={paying}>
                {paying ? "Processing..." : "Book & Pay Now"}
            </button>

            <br /> <br />

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>
        </div>
    );

}
