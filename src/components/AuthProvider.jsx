import { useReducer, useEffect } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
    switch(action.type) {
        case "Login" : {
            return { ...state, isLoggedIn: true, user: action.payload, serverErrors: '' };
        }
        case "Logout" : {
            return { ...state, isLoggedIn: false, user: null };
        }
        case "UpdateUser" : {
            return { ...state, user: action.payload };
        }
        case "ServerErrors" : {
            return { ...state, serverErrors: action.payload };
        }
        default: {
            return {...state};
        }
    }
}

export default function AuthProvider(props) {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        isLoggedIn: false,
        serverErrors: ''
    });

    useEffect(() => {
        if(localStorage.getItem('token')) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get('/user/account', { headers: { Authorization: localStorage.getItem('token')} });
                    dispatch({ type: "Login", payload: response.data });
                } catch(err) {
                    console.log(err);
                }
            }
            fetchUser();
        }
    }, [])

    const handleRegister = async (formData, resetForm) => {
        try {
            const response = await axios.post('/user/register', formData);
            alert('successfully registered')
            resetForm();
            dispatch({ type: "ServerErrors", payload: '' });
            navigate('/login');
        } catch(err) {
            console.log(err.response.data.error);
            dispatch({ type: "ServerErrors", payload: err.response.data.error });
        }
    }

    const handleLogin = async (formData, resetForm) => {
        try {
            const response = await axios.post('/user/login', formData);
            localStorage.setItem('token', response.data.token);
            const userResponse = await axios.get('/user/account', { headers: { Authorization: localStorage.getItem('token')} });
            resetForm();
            alert('Successfully logged in');
            dispatch({ type: "Login", payload: userResponse.data });
            navigate('/dashboard');
        } catch(err) {
            dispatch({ type: "ServerErrors", payload: err.response.data.error });
        }
    }

    const handleLogout = async () => {
        localStorage.removeItem('token');
        dispatch({ type: "Logout" });
    }

    return (
        <div>
            <UserContext.Provider value={{ ...state, handleRegister, handleLogin, handleLogout }}>
                { props.children }
            </UserContext.Provider>
        </div>
    )
}