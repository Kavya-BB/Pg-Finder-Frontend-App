import { useFormik } from 'formik';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Register() {
    const { handleRegister, serverErrors } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: ''
        },
        onSubmit: (values, { resetForm }) => {
            handleRegister(values, resetForm);
        }
    })

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1> Register with us </h1>
                <p className="auth-subtitle">
                    Join PG Finder and find your perfect stay
                </p>

                { serverErrors && <p className="error-text"> { serverErrors } </p> }

                <form onSubmit={formik.handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Enter name" />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="••••••••" />
                    </div>

                    <div className="form-group">
                        <label>Select Role</label>
                        <select name="role" value={formik.values.role} onChange={formik.handleChange}>
                            <option value=""> select role </option>
                            <option value="admin"> admin </option>
                            <option value="owner"> owner </option>
                            <option value="user"> user </option>
                        </select>
                    </div>
                    
                    <button type="submit" className="btn-primary full-width">
                        Register
                    </button>

                    <p className="auth-footer">
                        Already have an account? <span> <Link to="/login"> Login </Link> </span>
                    </p>
                </form>
            </div>
        </div>
    )
}