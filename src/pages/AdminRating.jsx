import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPgRatings, clearRatingStatus } from "../slices/rating-slice";
import { Link } from "react-router-dom";

export default function AdminRating() {
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
            <h1> Admin – PG Ratings </h1>

            <select value={pgId} onChange={(e) => setPgId(e.target.value)}>
                <option value=""> Select PG </option>
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

            {loading && <p>Loading ratings...</p>}

            {!loading && pgId && ratings.length === 0 && (
                <p>No ratings for this PG</p>
            )}

            {ratings.map(r => (
                <div
                    key={r._id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "10px",
                        borderRadius: "6px"
                    }}
                >
                    <p>
                        ⭐ <b>{r.roomRating}</b> / 5
                    </p>

                    {r.comments && (
                        <p>
                            <b>Comment:</b> {r.comments}
                        </p>
                    )}

                    <p style={{ fontSize: "14px", color: "#555" }}>
                        <b>User:</b> {r.userId?.name} ({r.userId?.email})
                    </p>
                </div>
            ))}

            <br />

            <Link to="/dashboard">
                <button> Back to Dashboard </button>
            </Link>
        </div>
    );
}
