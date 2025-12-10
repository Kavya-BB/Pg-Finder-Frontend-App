import { useFormik } from 'formik';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

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
        <div>
            <h1> Login with us </h1>
            { serverErrors && <p style={{ color: 'red' }}> {serverErrors}</p>}
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter email" />
                </div>
                <div>
                    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter password" />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}