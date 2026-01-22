import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createRating, fetchPgRatings } from "../slices/rating-slice";
import { fetchPublicPgData } from "../slices/pg-slice";
import "../styles/RatingForm.css";

export default function RatingForm() {
    const { pgId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors, successMsg } = useSelector((state) => {
        return state.rating
    });

    const [formData, setFormData] = useState({
        roomRating: 5,
        comments: ""
    });

    useEffect(() => {
        if(successMsg) {
            setTimeout(() => {
                navigate(-1);
            }, 1500);
        }
    }, [successMsg]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRating({ ...formData, pgId }))
            .unwrap()
            .then(() => {
                dispatch(fetchPgRatings(pgId));
                dispatch(fetchPublicPgData());
            });
    };

    return (
        <div className="rating-page">
            <div className="rating-card">
                <h1> Rate this PG </h1>

                { successMsg && <p className="success"> { successMsg } </p> }
                { errors && <p className="error"> { errors.error}  </p> }

                <form onSubmit={handleSubmit}>
                    <label className="label"> Your Rating </label>

                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= formData.roomRating ? "star active" : "star"}
                                onClick={() =>
                                    setFormData({ ...formData, roomRating: star })
                                }
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <br />

                    <textarea
                        placeholder="Write a comment (optional)"
                        value={formData.comments}
                        onChange={(e) => 
                            setFormData({ ...formData, comments: e.target.value })
                        } 
                    />

                    <br />

                    <div className="btn-group">
                        <button className="submit-btn" disabled={loading}>
                            { loading ? "Submitting..." : "Submit Rating" }
                        </button>

                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => navigate(`/public-pg/${pgId}`)}
                        >
                            Back to PG
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}