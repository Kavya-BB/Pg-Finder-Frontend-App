import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import "../styles/Account.css";

export default function Account() {
    const { user } = useContext(UserContext);
    
    if(!user) {
        return <p className="loading-text"> Loading... </p>;
    }
    
    return (
        <div className="account-page">
            <div className="account-card">
                <div className="avatar">
                    {user.name.charAt(0).toUpperCase()}
                </div>
            
                <h2> { user.name } </h2>
                <p className="email"> email - { user.email } </p>
                
                <span className={`role-badge ${user.role}`}>
                    {user.role.toUpperCase()}
                </span>

                <div className="info">
                    <div>
                        <label>Name</label>
                        <span>{user.name}</span>
                    </div>
                    <div>
                        <label>Email</label>
                        <span>{user.email}</span>
                    </div>
                    <div>
                        <label>Role</label>
                        <span>{user.role}</span>
                    </div>
                </div>

                <div className="actions">
                    {(user.role === "user" || user.role === "owner") && (
                        <Link to={`/edit-profile/${user._id}`}>
                            <button className="primary-btn">
                                Edit Profile
                            </button>
                        </Link>
                    )}

                    <div>
                        <Link to="/dashboard">
                            <button className="secondary-btn">
                                Back to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}