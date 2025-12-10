import { useFormik } from 'formik';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

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
        <div>
            <h1> Register with us </h1>
            { serverErrors && <p style={{ color: 'red' }}> {serverErrors}</p>}
            <form onSubmit={formik.handleSubmit}>
                
                <div>
                    <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Enter name" />
                </div>
                <div>
                    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter email" />
                </div>
                <div>
                    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter password" />
                </div>
                <div>
                    <select name="role" value={formik.values.role} onChange={formik.handleChange}>
                        <option value=""> select role </option>
                        <option value="admin"> admin </option>
                        <option value="owner"> owner </option>
                        <option value="user"> user </option>
                    </select>
                </div>
                <div>
                    <input type="submit" value="register" />
                </div>
            </form>
        </div>
    )
}