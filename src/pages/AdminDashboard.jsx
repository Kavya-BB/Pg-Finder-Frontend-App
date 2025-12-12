import { useSelector } from "react-redux";

export default function AdminDashboard() {
    const { data, loading, errors } = useSelector((state) => {
        return state.pg;
    });

    if(loading) {
        return <p> Loading PG data... </p>
    };

    if(errors) {
        return <p style={{ color: 'red' }}> { errors.message } </p>
    }

    return (
        <div>
            <h1> Admin Dashboard Page </h1>
            <p> Manage Users and PGs here </p>

            <p> Total Pgs - { data.length } </p>
            <p> Approved Pgs - { data.filter(pg => pg.approved).length } </p>
            <p> Pending Pgs - { data.filter(pg => !pg.approved).length } </p>

            <table border="1">
                <thead>
                    <tr>
                        <th> PG Name </th>
                        <th> Location </th>
                        <th> verified </th>
                        <th> Approved </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(pg => (
                            <tr key={pg._id}>
                                <td> { pg.pgname } </td> 
                                <td> { pg.location?.address } </td>
                                <td> { pg.verified ? "Yes" : "No" } </td>
                                <td> { pg.approved ? "Yes" : "No" } </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}