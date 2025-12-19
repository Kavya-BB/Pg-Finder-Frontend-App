import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPgById } from "../slices/pg-slice";

export default function PGDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedPg, loading, errors } = useSelector((state) => {
        return state.pg;
    });

    useEffect(() => {
        dispatch(fetchPgById(id));
    }, [dispatch, id]);

    if(loading) {
        return <p> Loading PG details... </p>
    }

    if(errors) {
        return <p style={{ color: 'red' }}> { errors.message } </p>
    }

    if(!selectedPg) {
        return <p> No PG details found. </p>
    }

    return (
        <div>
            <h1> PG Details Page </h1>
            <h2> { selectedPg.pgname } </h2>

            <p>
                <strong> Location: </strong> { selectedPg.location?.address }
            </p>

            <p>
                <strong> Verified: </strong> { selectedPg.isVerified ? "Yes" : "No" }
            </p>

            <p>
                <strong> Approved: </strong> { selectedPg.isApproved ? "Yes" : "No" }
            </p>

            <p><strong>Room Types:</strong></p>
            <ul>
                {selectedPg.roomTypes?.map((room, index) => (
                <p key={index}>
                    {room.roomType} - ₹{room.rent} ({room.count} rooms)
                </p>
                ))}
            </ul>

            <p>
                <strong> Amenities: </strong> { selectedPg.amenities?.join(", ") }
            </p>

            <p>
                <strong> Description: </strong> { selectedPg.description }
            </p>

            {selectedPg.pgCertificate && (
                <div>
                    <strong>PG Certificate:</strong><br />
                    <img
                        src={selectedPg.pgCertificate}
                        alt="PG Certificate"
                        width="300"
                    />
                </div>
            )}

            {selectedPg.pgPhotos && selectedPg.pgPhotos.length > 0 && (
                <div>
                    <strong>PG Photos:</strong>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {selectedPg.pgPhotos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`PG Photo ${index + 1}`}
                                width="200"
                            />
                        ))}
                    </div>
                </div>
            )}

            <p>
                <strong> Rating: </strong> { selectedPg.rating }
            </p>
            
            {/* <p>
                <strong>
                    { user.role === "owner" && selectedPg.ownerId === user._id && (
                        <Link to={`/edit-pg/${selectedPg._id}`}>
                            <button> Edit PG </button>
                        </Link>
                    )}
                </strong>
            </p> */}

            <p>
                <strong>
                    <button> Edit PG </button>
                </strong>
            </p>

            <Link to="/pg-list"> <button> Back to PG Listings </button> </Link>
        </div>
    )
}