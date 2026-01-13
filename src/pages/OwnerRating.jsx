import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPgRatings, clearRatingStatus } from "../slices/rating-slice";

export default function OwnerRating() {
    const dispatch = useDispatch();
    const [pgId, setPgId] = useState("");

    const { data: ratings, loading } = useSelector(state => state.rating);
    const pgData = useSelector(state => state.pg.data);

    useEffect(() => {
        dispatch(clearRatingStatus());
    }, [dispatch]);

    const handleFetch = () => {
        if (pgId) {
            dispatch(fetchPgRatings(pgId));
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1> PG Ratings </h1>

            <select value={pgId} onChange={(e) => setPgId(e.target.value)}>
                <option value=""> Select your PG </option>
                {pgData.map(pg => (
                    <option key={pg._id} value={pg._id}>
                        {pg.pgname}
                    </option>
                ))}
            </select>

            <button onClick={handleFetch} style={{ marginLeft: "10px" }}>
                View Ratings
            </button>

            <br /><br />

            {loading && <p>Loading...</p>}

            {ratings.length === 0 && pgId && !loading && (
                <p>No ratings yet</p>
            )}

            {ratings.map(r => (
                <div key={r._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                    <p><b>User:</b> {r.userId?.name}</p>
                    <p>⭐ {r.roomRating} / 5</p>
                    {r.comments && <p>{r.comments}</p>}
                </div>
            ))}

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>
        </div>
    );
}
