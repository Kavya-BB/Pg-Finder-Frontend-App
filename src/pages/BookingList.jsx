import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookings } from "../slices/booking-slice";
import "../styles/BookingList.css";

export default function BookingList() {
    const dispatch = useDispatch();
    const { data, loading, errors } = useSelector((state) => {
        return state.booking;
    });

    useEffect(() => {
        dispatch(fetchAllBookings());
    }, [dispatch]);

    if(loading) {
        return <p className="loading"> loading... </p>
    }

    if(errors) {
        return <p className="error"> {errors.error} </p>
    }
    
    return (
        <div className="booking-page">
            <div className="booking-header">
                <h1>All Bookings</h1>
                <p>View and manage all PG bookings</p>
            </div>

            { data.length == 0 ? ( 
                <p className="empty"> No bookings found </p> 
            ) : (
                <div className="table-wrapper">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th> User </th>
                                <th> Email </th>
                                <th> PG </th>
                                <th> Location </th>
                                <th> Room </th>
                                <th> Duration </th>
                                <th> Amount </th>
                                <th> Status </th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.map(ele => (
                                <tr key={ele._id}>
                                    <td> { ele.userId?.name } </td>
                                    <td> { ele.userId?.email } </td>
                                    <td> { ele.pgId?.pgname } </td>
                                    <td>{ele.pgId?.location?.address || "N/A"}</td>
                                    <td> { ele.roomType } </td>
                                    <td> { ele.duration } - { ele.durationType } </td>
                                    <td className="amount"> ₹{ ele.amount } </td>
                                    <td>
                                        <span className={`status ${ele.status?.toLowerCase()}`}>
                                            {ele.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="back-btn">
                <Link to="/dashboard">
                    <button> ← Back to Dashboard </button>
                </Link>
            </div>
        </div>
    )
}