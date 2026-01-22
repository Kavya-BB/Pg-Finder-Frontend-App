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
                <div className="rating-card" key={r._id}>
                    <div className="rating-header">
                        <span className="stars">⭐ {r.roomRating} / 5</span>
                        <span className="pg-name">{r.pgId?.pgname}</span>
                    </div>

                    {r.comments && (
                        <p className="rating-comment">“{r.comments}”</p>
                    )}

                    <div className="rating-user">
                        <span>{r.userId?.name}</span>
                        <span className="email">{r.userId?.email}</span>
                    </div>
                </div>
            ))}

            <br />

            <Link to="/dashboard">
                <button> Back to Dashboard </button>
            </Link>
        </div>
    );
}
