import { useFormik } from 'formik';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom"

export default function Login() {
    const { handleLogin, serverErrors } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values, { resetForm }) => {
            handleLogin(values, resetForm);
        }
    })

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Welcome Back</h1>
                <p className="auth-subtitle">
                    Login to continue finding your perfect PG
                </p>

                { serverErrors && <p className="error-text"> { serverErrors } </p> }

                <form onSubmit={formik.handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="••••••••" />
                    </div>

                    <button type="submit" className="btn-primary full-width">
                        Login
                    </button>

                    <p className="auth-footer">
                        Don't have an account? <span> <Link to="/register"> Register </Link> </span>
                    </p>
                </form>
            </div>
        </div>
    )
}