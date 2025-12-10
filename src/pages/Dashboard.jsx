import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Dashboard(props) {
    const { user } = useContext(UserContext);

    if(!user) {
        return <p> loading... </p>
    }

    return (
        <div>
            <h1> Dashboard Page </h1>
            <p> Wlecome, { user.name } </p>
        </div>
    )
}