import { useDispatch } from "react-redux";
import { createBooking } from "../slices/booking-slice";
import { useParams } from "react-router-dom";

export default function RoomBooking() {
    const dispatch = useDispatch();
    const { pgId } = useParams();

    const handleBooking = () => {
        dispatch(createBooking(formData));
    };

    return (
        <div>
            <h1> Book a Pg Room </h1>
            <button onClick={handleBooking}> Book Now </button>
        </div>
    )
}