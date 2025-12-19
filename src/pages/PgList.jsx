import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { fetchPgData, verifyPgCertificate, approvePg, deletePg } from "../slices/pg-slice";

export default function PgList() {
    const location = useLocation();
    const filter = location.state?.filter;

    const dispatch = useDispatch();
    const { user } = useContext(UserContext);

    const { data, loading, errors } = useSelector((state) => {
        return state.pg;
    });

    useEffect(() => {
        dispatch(fetchPgData());
    }, [dispatch]);

    const handleVerify = (pg) => {
        if(user.role !== 'admin') {
            alert("Only admin can verify PG certificates");
            return;
        }
        dispatch(verifyPgCertificate({ id: pg._id, isVerified: !pg.isVerified }));
    };

    const handleApprove = (pg) => {
        dispatch(approvePg({
            id: pg._id,
            isApproved: !pg.isApproved
        }))
    };

    const handleDelete = (pg) => {
        if(window.confirm("Are you sure you want to delete this PG?")) {
            dispatch(deletePg(pg._id));
        }
    };

    const filteredData = data.filter(pg => {
        if(filter === "approved") return pg.isApproved;
        if(filter === "pending") return !pg.isApproved;
        if(filter === "verified") return pg.isVerified;
        return true;
    });

    if(loading) {
        return <p> Loading PG data... </p>
    };

    return (
        <div>
            <h1> Pg Listings </h1>
            { errors && <p style={{ color: 'red' }}> { errors.message } </p> }

            <b> Total Pgs - { data.length } </b><br />
            <b> Showing Pgs - { filteredData.length } </b>
            <br /> <br />
            <b> Approved Pgs - { data.filter(pg => pg.isApproved).length } </b>, {" "}
            <b> Pending Pgs - { data.filter(pg => !pg.isApproved).length } </b> <br /> <br />

            <table border="1">
                <thead>
                    <tr>
                        <th> PG Name </th>
                        <th> Location </th>
                        <th> verified </th>
                        <th> Approved </th>
                        { user?.role == "admin" && <th> Action1 </th> }
                        { user?.role == "admin" && <th> Action2 </th> }
                        { user?.role == "admin" && <th> Action </th> }
                        <th> View Details </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map(ele => (
                            <tr key={ele._id}>
                                <td> { ele.pgname } </td> 
                                <td> { ele.location?.address } </td>
                                <td> { ele.isVerified ? "Yes" : "No" } </td>
                                <td> { ele.isApproved ? "Yes" : "No" } </td>

                                { user?.role == "admin" && (
                                    <td>
                                        <button onClick={() => handleVerify(ele)}> { ele.isVerified ? "Unverify" : "Verify" } </button>
                                    </td>
                                )}

                                { user?.role == "admin" && (
                                    <td>
                                        <button disabled={!ele.isVerified} onClick={() => handleApprove(ele)}> { ele.isApproved ? "Reject" : "Approve" } </button>
                                    </td>
                                )}

                               { user?.role == "admin" && (
                                <td>
                                    <button onClick={() => handleDelete(ele._id)}> Delete PG </button>
                                </td>
                               )}                                

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