import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings, cancelBooking } from "../slices/booking-slice";

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
        <div>
            <h1> User Bookings List </h1>

            {data.length === 0 ? (
                <p>No bookings found</p>
                ) : (
                    data.map(ele => (
                        <div
                            key={ele._id}
                            style={{
                                marginBottom: "15px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px"
                            }}
                        >
                            <p>
                                <strong>
                                    {ele.pgId?.pgname}
                                </strong>
                            </p>

                            <p>
                                Location: {ele.pgId?.location?.address || "N/A"}
                            </p>

                            <p>
                                Room: {ele.roomType}
                            </p>

                            <p>
                                Duration: {ele.duration} {ele.durationType}
                            </p>

                            <p>
                                Status: <b>{ele.status}</b>
                            </p>

                            <button
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
                ))
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