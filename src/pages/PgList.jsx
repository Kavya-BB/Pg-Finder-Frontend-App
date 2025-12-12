import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PgList() {
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
            <h1> Pg Listings </h1>
            <b> Total Pgs - { data.length } </b> <br /> <br />
            <b> Approved Pgs - { data.filter(pg => pg.isApproved).length },  </b> <span></span>
            <b> Pending Pgs - { data.filter(pg => !pg.isApproved).length } </b> <br /> <br />

            <table border="1">
                <thead>
                    <tr>
                        <th> PG Name </th>
                        <th> Location </th>
                        <th> verified </th>
                        <th> Approved </th>
                        <th> Actions </th>
                        <th> View Details </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(ele => (
                            <tr key={ele._id}>
                                <td> { ele.pgname } </td> 
                                <td> { ele.location?.address } </td>
                                <td> { ele.isVerified ? "Yes" : "No" } </td>
                                <td> { ele.isApproved ? "Yes" : "No" } </td>
                                <td> <button> Delete Pg </button> </td>
                                <td> <Link to={`/pg-details/${ele._id}`}> <button> View Pg </button> </Link> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}