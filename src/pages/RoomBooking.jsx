import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../slices/booking-slice";
import { createPayment } from "../slices/payment-slice";
import razorpayCheckout from "../utils/razorpayCheckout";

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
        <div>
            <h1>Select & Book Room</h1>

            { pg.roomTypes.map(room => {
                const isSelected = selectedRoom?._id === room._id;

                return (
                    <div key={room._id}>
                        <p>Type: {room.roomType}</p>
                        <p>Price: ₹{room.rent}</p>

                        <button
                            onClick={() => setSelectedRoom(room)}
                            disabled={room.count === 0}
                        >
                            {isSelected ? "Selected" : "Select"}
                        </button>
                    </div>
                );
            })}

            <button onClick={handleBooking} disabled={paying}>
                {paying ? "Processing..." : "Book & Pay Now"}
            </button>

            <br />

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>
        </div>
    );
}