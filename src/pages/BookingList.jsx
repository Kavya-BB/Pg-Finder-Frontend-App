import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookings } from "../slices/booking-slice";

export default function BookingList() {
    const dispatch = useDispatch();
    const { data, loading, errors } = useSelector((state) => {
        return state.booking;
    });

    useEffect(() => {
        dispatch(fetchAllBookings());
    }, [dispatch]);

    if(loading) {
        return <p> loading... </p>
    }

    if(errors) {
        return <p style={{ color: "red" }}> {errors.error} </p>
    }
    
    return (
        <div>
            <h1> All Booking List </h1>

            { data.length == 0 ? ( <p> No bookings found </p> ) : (
                <table border="1" cellPadding="10">
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
                                <td> ₹{ ele.amount } </td>
                                <td> { ele.status } </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) }

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>
        </div>
    )
}