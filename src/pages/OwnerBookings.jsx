import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerBookings, confirmBooking, cancelBooking } from "../slices/booking-slice";
import "../styles/owner-bookings.css";

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
        <div className="page">
            <div className="owner-bookings-card">

                <div className="owner-bookings-header">
                    <h1>My PG Bookings</h1>
                    <p>Manage and respond to booking requests</p>
                </div>

                {data.length === 0 ? (
                    <div className="empty-state">
                        <p>No bookings found</p>
                    </div>
                ) : (
                <div className="table-wrapper">
                    <table className="booking-table">
                        <thead>
                            <tr>
                            <th>User</th>
                            <th>PG</th>
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
                                <td>
                                    <strong>{ele.userId?.name}</strong>
                                    <div className="muted">{ele.userId?.email}</div>
                                </td>

                                <td>
                                    <strong>{ele.pgId?.pgname}</strong>
                                    <div className="muted">
                                        {ele.pgId?.location?.address || "N/A"}
                                    </div>
                                </td>

                                <td>{ele.roomType}</td>

                                <td>
                                    {ele.duration} {ele.durationType}
                                </td>

                                <td className="amount">₹{ele.amount}</td>

                                <td>
                                    <span className={`status ${ele.status}`}>
                                        {ele.status}
                                    </span>
                                </td>

                                <td className="actions">
                                    {ele.status === "pending" && (
                                        <>
                                        <button
                                            className="btn btn-success small"
                                            onClick={() => handleConfirm(ele._id)}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            className="btn btn-danger small"
                                            onClick={() => handleCancel(ele._id)}
                                        >
                                            Cancel
                                        </button>
                                        </>
                                    )}

                                    {ele.status === "confirmed" && (
                                        <button
                                        className="btn btn-danger small"
                                        onClick={() => handleCancel(ele._id)}
                                        >
                                        Cancel
                                        </button>
                                    )}

                                    {ele.status === "cancelled" && (
                                        <span className="muted">—</span>
                                    )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}

                <div className="footer-actions">
                    <Link to="/dashboard">
                        <button className="btn btn-outline">Back to Dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}