import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPgData } from "../slices/pg-slice";

export default function PublicPg() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { data, loading, errors } = useSelector((state) => {
        return state.pg;
    });

    useEffect(() => {
        if(data.length === 0) {
            dispatch(fetchPublicPgData())
        }
    }, [dispatch, data.length]);

    const pg = data.find(pg => pg._id === id);

    if(loading) {
        return <p> loading... </p>;
    }

    if(errors) {
        return <p style={{ color: "red" }}> Error: {errors.message} </p>;
    }

    if(!pg) {
        return <p> PG not found </p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1> { pg.name } </h1>

            <p> <strong> Location:</strong> { pg.location?.address } </p>

            <p> <strong> RoomType:</strong> </p>
            <ul>
                { pg.roomTypes?.map(room => (
                    <p key={room._id}>
                        { room.roomType } - ₹{ room.rent } ({ room.count } rooms)
                    </p>
                ))}
            </ul>

            <p> <strong> Amenities:</strong> { pg.amenities?.join(", ") } </p>

            <p> <strong> Description:</strong> { pg.description } </p>

            <p> <strong> Rating: </strong> ⭐{ pg.rating } </p>

            { pg.pgPhotos?.length === 0 && <p> No photos available </p> }

            { pg.pgPhotos?.length > 0 && (
                <img
                    src={pg.pgPhotos[0]}
                    alt={pg.pgname}
                    width="300"
                />
            )}

            <br /> <br />

            <div>
                <Link to={`/room-bookings/${pg._id}`}>
                    <button>Book Now</button>
                </Link>
            </div>

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>
        </div>
    )
}