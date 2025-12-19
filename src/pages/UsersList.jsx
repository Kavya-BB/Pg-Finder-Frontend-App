import { useState, useEffect } from "react";
import axios from "../config/axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";

export default function UsersList() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const listType = location.state?.type;


    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await axios.get('/user/allusers', { headers: { Authorization: localStorage.getItem('token')} });
                setUsers(response.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchUsersList();
    }, []);

    const filteredUsers = users.filter((u) => {
        if (listType === "user") return u.role === "user";
        if (listType === "owner") return u.role === "owner";
        return true;
    });


    const handleRemove = async (id, email) => {
        const userConfirmation = window.confirm("Are you sure?");
        if(userConfirmation) {
            const userEmail = window.prompt("Enter email of the user");
            if(userEmail == email) {
                try {
                    const response = await axios.delete(`/user/remove/${id}`, { headers: { Authorization: localStorage.getItem('token')} });
                    const newArr = users.filter(ele => ele._id !== response.data.user._id);
                    setUsers(newArr);
                } catch(err) {
                    console.log(err.message);
                }
            } else {
                alert("Email is invalid");
            }
        }
    };

    const handleEdit = async (id, oldRole) => {
        const newRole = window.prompt("Enter new role (admin/owner/user):", oldRole);
        if (!newRole) return;
        try {
            const response = await axios.put(
                `/user/update/${id}`, 
                { role: newRole }, 
                { headers: { Authorization: localStorage.getItem('token') } }
            );
            setUsers(prev =>
                prev.map(ele =>
                    ele._id === id ? response.data : ele
                )
            );
            alert("User updated successfully.");
        } catch (err) {
            console.log(err);
            alert("Failed to update user");
        }
    };


    if(!user) {
        return <p> loading... </p>
    }

    return (
        <div>
            <h1> Users List </h1>
            <table border="1">
                <thead>
                    <tr>
                        <th> name </th>
                        <th> email </th>
                        <th> role </th>
                        { user?.role == "admin" && <th> Action1 </th> }
                        { user?.role == "admin" && <th> Action2 </th> }
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsers.map((ele) => {
                            return (
                                <tr key={ele._id}>
                                    <td> {ele.name} </td>
                                    <td> {ele.email} </td>
                                    <td> {ele.role} </td>

                                    { user?.role == "admin" && <td> {user?._id !== ele._id && <button onClick={() => {
                                        handleRemove(ele._id, ele.email)
                                    }}> remove </button>} </td> }

                                    { user?.role == "admin" && <td> {user?._id !== ele._id && <button onClick={() => {
                                        handleEdit(ele._id)
                                    }}> edit </button>} </td> }
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <br />

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>
        </div>
    )
}