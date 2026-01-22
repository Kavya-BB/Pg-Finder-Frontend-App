import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPgData } from "../slices/pg-slice";
import { fetchPgRatings, clearRatingStatus } from "../slices/rating-slice";
import "../styles/PublicPg.css"

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

    useEffect(() => {
        dispatch(clearRatingStatus());
        dispatch(fetchPgRatings(id));
    }, [dispatch, id])

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
        <div className="pg-card">

            <h1> { pg?.pgname } </h1>

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

            <div>
                {[1,2,3,4,5].map(star => (
                    <span
                        key={star}
                        style={{
                            color: star <= Math.round(pg.rating) ? "#ffc107" : "#ccc",
                            fontSize: "22px"
                        }}
                    >
                        ★
                    </span>
                ))}
                <span> ({ pg.rating })</span>
            </div>

            { pg.pgPhotos?.length === 0 && <p> No photos available </p> }

            { pg.pgPhotos?.length > 0 && (
                <img
                    src={pg.pgPhotos[0]}
                    alt={pg.pgname}
                    width="300"
                />
            )}

            <br />

            <div className="pg-actions">
                <div>
                    <Link to={`/room-bookings/${pg._id}`} state={{ pg }}>
                        <button>Book Now</button>
                    </Link>
                </div>

                <div>
                    <Link to={`/pg-ratings/${pg._id}`}>
                        <button>Rate this PG</button>
                    </Link>
                </div>
            </div>

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>
        </div>
    )
}