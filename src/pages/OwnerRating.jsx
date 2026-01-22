import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPgRatings, clearRatingStatus } from "../slices/rating-slice";
import "../styles/owner-rating.css";

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
        <div className="page">
            <div className="owner-rating-card">

                <div className="rating-header">
                    <h1>PG Ratings</h1>
                    <p>See what users are saying about your PG</p>
                </div>

                <div className="rating-controls">
                    <select value={pgId} onChange={(e) => setPgId(e.target.value)}>
                        <option value=""> Select your PG </option>
                        {pgData.map(pg => (
                            <option key={pg._id} value={pg._id}>
                                {pg.pgname}
                            </option>
                        ))}
                    </select>

                    <button className="btn btn-primary" onClick={handleFetch}>
                        View Ratings
                    </button>
                </div>

                {loading && <p className="loading-text">loading...</p>}

                {ratings.length === 0 && pgId && !loading && (
                    <div className="empty-state">
                        <p>No ratings yet for this PG</p>
                    </div>
                )}

                <div className="ratings-list">
                    {ratings.map(r => (
                        <div className="rating-card" key={r._id}>
                            <div className="rating-top">
                                <div>
                                    <strong>{r.userId?.name}</strong>
                                </div>

                                <div className="stars">
                                    {"★".repeat(r.roomRating)}
                                    {"☆".repeat(5 - r.roomRating)}
                                </div>
                            </div>

                            {r.comments && (
                                <p className="comment">
                                “{r.comments}”
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="footer-actions">
                    <Link to="/dashboard">
                        <button className="btn btn-outline">
                            Back to Dashboard 
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
