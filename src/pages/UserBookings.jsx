import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings, cancelBooking } from "../slices/booking-slice";
import "../styles/UserBookings.css";

export default function UserBookings() {
    const dispatch = useDispatch();
    const { data, loading, errors } = useSelector((state) => {
        return state.booking;
    });

    useEffect(() => {
        dispatch(fetchUserBookings());
    }, [dispatch]);
    
    if(loading) {
        return <p> loading... </p>
    }
    
    if(errors) {
        return <p style={{ color: "red" }}> {errors.error} </p>
    }

    return (
        <div className="booking-page">
            <h1> User Bookings List </h1>

            {data.length === 0 ? (
                <p className="empty-text">No bookings found</p>
                ) : (
                    <div className="booking-list">
                        {data.map(ele => (
                            <div className="booking-card" key={ele._id}>
                                <div className="booking-header">
                                    <h3> {ele.pgId?.pgname} </h3>
                                    <span className={`status ${ele.status}`}>
                                        {ele.status}
                                    </span>
                                </div>

                                <p>
                                    <strong> Location: </strong> {ele.pgId?.location?.address || "N/A"}
                                </p>

                                <p>
                                    <strong> Room: </strong> {ele.roomType}
                                </p>

                                <p>
                                    <strong> Duration: </strong> {ele.duration} {ele.durationType}
                                </p>

                                <button
                                    className="cancel-btn"
                                    disabled={ele.status !== "pending"}
                                    onClick={() => 
                                        dispatch(cancelBooking(ele._id))
                                            .unwrap()
                                            .then(() => alert("Booking cancelled"))
                                            .catch(() => alert("Cancel failed"))
                                    }
                                >
                                    {ele.status === "cancelled" ? "Cancelled" : "Cancel Booking"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            <br />

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>
        </div>
    )
}