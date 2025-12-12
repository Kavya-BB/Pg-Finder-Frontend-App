import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { fetchPgData, fetchPublicPgData } from "../slices/pg-slice";
import { useDispatch } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import OwnerDashboard from "./OwnerDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard(props) {
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) return;
        if(user.role == "admin" || user.role == "owner") {
            dispatch(fetchPgData());
        } else if(user.role == "user") {
            dispatch(fetchPublicPgData());
        }
    }, [dispatch]);

    if(!user) {
        return <p> loading... </p>
    }

    if(user.role === "admin") {
        return <AdminDashboard />
    } else if(user.role === "owner") {
        return <OwnerDashboard />
    } else if(user.role === "user") {
        return <UserDashboard />
    } else {
        return <p> Normal Dashboard Page </p>
    }

    return (
        <div>
            <h1> Dashboard Page </h1>
        </div>
    )
}