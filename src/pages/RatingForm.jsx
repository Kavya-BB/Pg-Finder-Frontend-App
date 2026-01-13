import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createRating, fetchPgRatings } from "../slices/rating-slice";
import { fetchPublicPgData } from "../slices/pg-slice";

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
        <div>
            <h1> Rate this PG </h1>

            { successMsg && <p style={{ color: "green" }}> { successMsg } </p> }
            { errors && <p style={{ color: "red" }}> { errors.error}  </p> }

            <form onSubmit={handleSubmit}>
                <label> Rating (1-5) </label>
                <div style={{ fontSize: "30px", margin: "10px 0" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() =>
                                setFormData({ ...formData, roomRating: star })
                            }
                            style={{
                                cursor: "pointer",
                                color: star <= formData.roomRating ? "#ffc107" : "#ccc",
                                marginRight: "6px"
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>


                <br /> <br />

                <textarea
                    placeholder="Write a comment (optional)"
                    value={formData.comments}
                    onChange={(e) => 
                        setFormData({ ...formData, comments: e.target.value })
                    } 
                />

                <br /> <br />

                <button disabled={loading}>
                    { loading ? "Submitting..." : "Submit Rating" }
                </button>
                
                <div>
                    <Link to={`/public-pg/${pgId}`}>
                        <button> Back to pg </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}