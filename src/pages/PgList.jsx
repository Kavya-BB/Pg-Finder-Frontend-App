import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { verifyPgCertificate } from "../slices/pg-slice";

export default function PgList() {
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);

    const { data, loading, errors } = useSelector((state) => {
        return state.pg;
    });  

    // const handleVerify = (pg) => {
    //     if(user.role !== 'admin') {
    //         alert("Only admin can verify PG certificates");
    //         return;
    //     }
    //     dispatch(verifyPgCertificate({ id: pg._id, isVerified: !pg.isVerified }));
    // };

    if(loading) {
        return <p> Loading PG data... </p>
    };

    if(!user) {
        return <p> loading... </p>
    }

    if(errors) {
        return <p style={{ color: 'red' }}> { errors.message } </p>
    }

    return (
        <div>
            <h1> Pg Listings </h1>

            <b> Total Pgs - { data.length } </b> <br /> <br />
            <b> Approved Pgs - { data.filter(pg => pg.isApproved).length } </b>, {" "}
            <b> Pending Pgs - { data.filter(pg => !pg.isApproved).length } </b> <br /> <br />

            <table border="1">
                <thead>
                    <tr>
                        <th> PG Name </th>
                        <th> Location </th>
                        <th> verified </th>
                        <th> Approved </th>
                        <th> Action </th>
                        {/* { user?.role == "admin" && <th> Action1 </th> }
                        { user?.role == "admin" && <th> Action2 </th> } */}
                        {/* { user?.role == "owner" && <th> Action2 </th> } */}
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
                                <td> <button> Delete PG </button> </td>
                                {/* <td> { user.role === "admin" && (
                                    <button onClick={() => handleVerify(ele)}> { ele.isVerified ? "Unverify" : "Verify" } </button>
                                )} </td>
                                <td> { user.role === "admin" && (
                                    <button> Approval </button>
                                )} </td> */}
                                {/* <td> { user.role === "owner" && ele.ownerId === user._id && (
                                    <Link to={`/edit-pg/${ele._id}`}>
                                        <button> Edit PG </button>
                                    </Link>
                                )} </td> */}

                                <td> <Link to={`/pg-details/${ele._id}`}> <button> View Pg </button> </Link> </td>
                            </tr>
                        ))
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