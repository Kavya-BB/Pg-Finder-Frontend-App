import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Account() {
    const { user } = useContext(UserContext);
    
    if(!user) {
        return <p> loading... </p>
    }
    return (
        <div>
            <h1> Account Page </h1>
            <p> name - { user.name } </p>
            <p> email - { user.email } </p>
            <p> role - { user.role } </p>

            <br />

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>

            <div>
                {(user.role === "user" || user.role === "owner") && (
                <div>
                    <Link to={`/edit-profile/${user._id}`}>
                        <button>Edit Profile</button>
                    </Link>
                </div>
            )}
            </div>
        </div>
    )
}