import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { fetchPgData, fetchPublicPgData, verifyPgCertificate, approvePg, deletePg } from "../slices/pg-slice";
import "../styles/PgList.css";

export default function PgList() {
    const location = useLocation();
    const filter = location.state?.filter;

    const dispatch = useDispatch();
    const { user } = useContext(UserContext);

    const { data, loading, errors, searchText } = useSelector((state) => {
        return state.pg;
    });

    useEffect(() => {
        if (!user) return;
        if(user.role === "admin" || user.role === "owner") {
            dispatch(fetchPgData());
        } else if(user.role === "user") {
            dispatch(fetchPublicPgData());
        }
    }, [dispatch, user]);

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

    const filteredData = (() => {
        let result = data;
        if (user?.role !== "user") {
            result = result.filter(pg => {
                if (filter === "approved") return pg.isApproved;
                if (filter === "pending") return !pg.isApproved;
                if (filter === "verified") return pg.isVerified;
                return true;
            });
        }
        if (searchText) {
            result = result.filter(pg =>
                pg.pgname.toLowerCase().includes(searchText.toLowerCase()) ||
                pg.location?.address?.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        return result;
    })();

    if(loading) {
        return <p> Loading PG data... </p>
    };

    return (
        <div>
            <h1> Pg Listings </h1>
            { errors && <p style={{ color: 'red' }}> { errors.message } </p> }

            <b> Showing Pgs - { filteredData.length } </b>
            <br /> <br />
            { user?.role !== "user" && (
                <>
                    <b> Total Pgs - { data.length } </b><br />
                    <b> Approved Pgs - { data.filter(pg => pg.isApproved).length } </b>, {" "}
                    <b> Pending Pgs - { data.filter(pg => !pg.isApproved).length } </b> <br /> <br />
                </>
            )}

            <table className="pg-table">
                <thead>
                    <tr>
                        <th> PG Name </th>
                        <th> Location </th>
                        { user?.role !== "user" && <th> verified </th> }
                        { user?.role !== "user" && <th> Approved </th> }
                        { user?.role == "admin" && <th> Action1 </th> }
                        { user?.role == "admin" && <th> Action2 </th> }
                        { user?.role == "admin" && <th> Action </th> }
                        { (user?.role === "admin" || user?.role === "owner" || user?.role === "user") && (
                            <th> View Details </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map(ele => (
                            <tr key={ele._id}>
                                <td> { ele.pgname } </td> 
                                <td> { ele.location?.address } </td>
                                { user?.role !== "user" && (
                                    <td>
                                        <span className={`badge ${ele.isVerified ? "badge-green" : "badge-red"}`}>
                                            {ele.isVerified ? "Verified" : "Not Verified"}
                                        </span>
                                    </td>
                                ) }
                                { user?.role !== "user" && (
                                    <td>
                                        <span className={`badge ${ele.isApproved ? "badge-green" : "badge-red"}`}>
                                            {ele.isApproved ? "Approved" : "Not Approved"}
                                        </span>
                                    </td>
                                ) }

                                { user?.role == "admin" && (
                                    <td>
                                        <button className="btn-sm btn-primary" onClick={() => handleVerify(ele)}> { ele.isVerified ? "Unverify" : "Verify" } </button>
                                    </td>
                                )}

                                { user?.role == "admin" && (
                                    <td>
                                        <button className="btn-sm btn-primary" disabled={!ele.isVerified} onClick={() => handleApprove(ele)}> { ele.isApproved ? "Reject" : "Approve" } </button>
                                    </td>
                                )}

                               { user?.role == "admin" && (
                                <td>
                                    <button className="btn-sm btn-danger" onClick={() => handleDelete(ele._id)}> Delete PG </button>
                                </td>
                               )}                                

                                { (user?.role === "admin" || user?.role === "owner") && (
                                    <td>
                                        <Link to={`/pg-details/${ele._id}`}>
                                            <button> View Pg </button>
                                        </Link>
                                    </td>
                                )}


                                { user?.role === "user" && (
                                    <td>
                                        <Link to={`/public-pg/${ele._id}`}>
                                            <button> View Pg </button>
                                        </Link>
                                    </td>
                                )}

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