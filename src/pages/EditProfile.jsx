import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateUserProfile } from "../slices/user-slice";
import "../styles/EditProfile.css";

export default function EditProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const reduxDispatch = useDispatch();
    const { user, dispatch: authDispatch } = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        if(user) {
            setFormData({
                name: user.name || "",
                email: user.email || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        reduxDispatch(updateUserProfile({ id, formData }))
            .unwrap()
            .then((response) => {
                authDispatch({ type: "UpdateUser", payload: response });
                alert("Profile updated successfully");
                navigate("/account");
            })
            .catch(err => alert(err?.error || "Update failed"));
    };

    if(!user) {
        return <p className="loading-text"> loading... </p>
    }

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-card">
                <h1> Edit My Profile </h1>
                <p className="subtitle">Update your personal details</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" /> <br />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" /> <br />
                    </div>

                    <button type="submit" className="primary-btn"> 
                        Update 
                    </button>
                </form>

                <div>
                    <Link to="/account">
                        <button className="secondary-btn">
                             Back to Account 
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}