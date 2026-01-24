import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPgById } from "../slices/pg-slice";
import "../styles/PgDetail.css";

export default function PGDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedPg, loading, errors } = useSelector((state) => {
        return state.pg;
    });

    useEffect(() => {
        dispatch(fetchPgById(id));
    }, [dispatch, id]);

    if(loading) {
        return <p className="loading-text"> loading PG details... </p>
    }

    if(errors) {
        return <p className="error-text"> { errors.message } </p>
    }

    if(!selectedPg) {
        return <p> No PG details found. </p>
    }

    return (
        <div className="pg-detail-page">
            <div className="pg-detail-card">

                <div className="pg-header">
                    <h1>{selectedPg.pgname}</h1>
                    <div className="status-badges">
                        <span className={`badge ${selectedPg.isVerified ? "verified" : "not-verified"}`}>
                            {selectedPg.isVerified ? "Verified" : "Not Verified"}
                        </span>
                        <span className={`badge ${selectedPg.isApproved ? "approved" : "pending"}`}>
                            {selectedPg.isApproved ? "Approved" : "Pending"}
                        </span>
                    </div>
                </div>

                <p className="location">
                    📍 {selectedPg.location?.address}
                </p>

                <div className="section">
                    <h3>Room Types</h3>
                    <div className="room-list">
                        {selectedPg.roomTypes?.map((room, index) => (
                            <div className="room-card" key={index}>
                                <span>{room.roomType}</span>
                                <span>₹{room.rent}</span>
                                <span>{room.count} rooms</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section">
                    <h3>Amenities</h3>
                    <div className="amenities">
                        {selectedPg.amenities?.map((a, i) => (
                            <span key={i} className="amenity-chip">{a}</span>
                        ))}
                    </div>
                </div>
                
                <div className="section">
                    <h3>Description</h3>
                    <p className="description"> { selectedPg.description } </p>
                </div>

                    {selectedPg.pgCertificate && (
                        <div className="section">
                            <h3>PG Certificate</h3>
                            <img
                                src={selectedPg.pgCertificate}
                                alt="PG Certificate"
                                className="certificate-img"
                            />
                        </div>
                    )}

                    {selectedPg.pgPhotos && selectedPg.pgPhotos.length > 0 && (
                        <div className="section">
                            <h3>PG Photos</h3>
                            <div className="photo-grid">
                                {selectedPg.pgPhotos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`PG Photo ${index}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="rating">
                        ⭐ <strong>{selectedPg.rating}</strong> / 5
                    </div>

                    <div className="action-buttons">
                        <button onClick={() => navigate(`/edit-pg/${selectedPg._id}`)}>
                            Edit PG
                        </button>
                    
                        <Link to="/pg-list"> 
                            <button className="secondary-btn">
                                Back to PG Listings 
                            </button> 
                        </Link>
                    </div>
            </div>
        </div>
    )
}