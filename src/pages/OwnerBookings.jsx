import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerBookings, confirmBooking, cancelBooking } from "../slices/booking-slice";

export default function OwnerBookings() {
    const dispatch = useDispatch();
    const { data, loading, errors } = useSelector((state) => {
        return state.booking;
    });

    useEffect(() => {
        dispatch(fetchOwnerBookings());
    }, [dispatch]);

    const handleConfirm = (id) => {
        dispatch(confirmBooking(id))
            .unwrap()
            .then(() => alert("Booking confirmed"))
            .catch(err => alert(err.error || "Confirmation failed"));
    };

    const handleCancel = (id) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        dispatch(cancelBooking(id))
            .unwrap()
            .then(() => alert("Booking cancelled"))
            .catch(err => alert(err.error || "Cancel failed"));
    };

    if(loading) {
        return <p> loading... </p>
    }

    if(errors) {
        return <p style={{ color: "red" }}> {errors.error} </p>
    }

    return (
    <div>
        <h1> My PG Bookings </h1>

        { data.length === 0 ? (
            <p> No bookings found </p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>PG</th>
                            <th>Location</th>
                            <th>Room</th>
                            <th>Duration</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ele => (
                            <tr key={ele._id}>
                                <td>{ele.userId?.name}</td>
                                <td>{ele.userId?.email}</td>
                                <td>{ele.pgId?.pgname}</td>
                                <td>{ele.pgId?.location?.address || "N/A"}</td>
                                <td>{ele.roomType}</td>
                                <td>{ele.duration} {ele.durationType}</td>
                                <td>₹{ele.amount}</td>
                                <td>{ele.status}</td>
                                <td>
                                    {ele.status === "pending" && (
                                        <>
                                            <button onClick={() => handleConfirm(ele._id)}>Confirm</button>
                                            <button
                                                style={{ marginLeft: "5px", color: "red" }}
                                                onClick={() => handleCancel(ele._id)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {ele.status === "confirmed" && (
                                        <button
                                            style={{ color: "red" }}
                                            onClick={() => handleCancel(ele._id)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    {ele.status === "cancelled" && (
                                        <span style={{ color: "gray" }}>Cancelled</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <br />

            <Link to="/dashboard">
                <button> Back to Dashboard </button>
            </Link>
        </div>
    );
}