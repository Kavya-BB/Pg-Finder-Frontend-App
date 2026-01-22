import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPgRatings, clearRatingStatus } from "../slices/rating-slice";
import UserContext from "../context/UserContext";
import "../styles/RatingsList.css";

export default function RatingsList() {
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);

    const [pgId, setPgId] = useState("");
    const { data, loading } = useSelector(state => state.rating);
    const pgData = useSelector(state => state.pg.data);

    useEffect(() => {
        dispatch(clearRatingStatus());
    }, [dispatch]);

    const handleFetch = () => {
        if (pgId) {
            dispatch(fetchPgRatings(pgId));
        }
    };

    const myRatings = data.filter(r => r.userId?._id === user._id);

    return (
        <div className="ratings-page">
            <div className="ratings-container">
                <h1> My Ratings </h1>

                <div className="filter-row">
                    <select value={pgId} onChange={(e) => setPgId(e.target.value)}>
                        <option value=""> Select PG </option>
                        { pgData.map(pg => (
                            <option key={pg._id} value={pg._id}>
                                {pg.pgname}
                            </option>
                        ))}
                    </select>

                    <button className="view-btn" onClick={handleFetch}>
                        View Rating
                    </button>
                </div>

                {loading && <p className="loading-text">Loading...</p>}

                {!loading && pgId && myRatings.length === 0 && (
                    <p className="empty-text">
                        You have not rated this PG yet
                    </p>
                )}

                <div className="ratings-list">
                    {myRatings.map(r => (
                        <div className="rating-card" key={r._id}>
                            <div className="rating-stars">
                                {"★".repeat(r.roomRating)}
                                {"☆".repeat(5 - r.roomRating)}
                            </div>

                            <p className="rating-score">>
                                ⭐ <b>{r.roomRating}</b> / 5
                            </p>

                            {r.comments && (
                                <p className="rating-comment">
                                    “{r.comments}”
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <br />

                <Link to="/dashboard" className="back-link">
                    ← Back to Dashboard 
                </Link>
            </div>
        </div>
    );
}
