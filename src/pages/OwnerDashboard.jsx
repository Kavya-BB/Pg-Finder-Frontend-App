import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function OwnerDashboard() {
    const { data, loading, errors} = useSelector((state) => {
        return state.pg;
    });

    if(loading) {
        return <p> loading... </p>
    }

    if(errors) {
        return <p style={{ color: 'red' }}> { errors.message } </p>
    }

    const totalPgs = data.length;
    const approvedPgs = data.filter(pg => pg.isApproved).length;
    const pendingPgs = data.filter(pg => !pg.isApproved).length;
    const verifiedPgs = data.filter(pg => pg.isVerified).length;

    return (
        <div style={{ padding: "20px" }}>
            <h1> Owner Dashboard Page </h1>
            <b> Manage your PG properties </b>

            <div style={gridStyle}>

                <div style={cardStyle}>
                    <h3> My PGs </h3>
                    <h2> { totalPgs } </h2>
                    <p> View all pgs you added </p>
                    <Link to="/pg-list">
                        <button style={btnStyle}> View Pgs </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <h3> Approved PGs </h3>
                    <h2> { approvedPgs } </h2>
                    <p> PGs approved by admin </p>
                    <Link to="/pg-list" state={{ filter: "approved" }}>
                        <button style={btnStyle}> View Approved </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <h3> Pending Approval </h3>
                    <h2> { pendingPgs } </h2>
                    <p> PGs pending admin approval </p>
                    <Link to="/pg-list" state={{ filter: "pending" }}>
                        <button style={btnStyle}> View Pending PGs </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <h3> Verified PGs </h3>
                    <h2> { verifiedPgs } </h2>
                    <p> PGs with verified certificates </p>
                    <Link to="/pg-list" state={{ filter: "verified" }}>
                        <button style={btnStyle}> View Verified PGs </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <h3> Add PGs </h3>
                    <h2> + </h2>
                    <p> Add a new PG property </p>
                    <Link to="/pg-form">
                        <button style={btnStyle}> Add PG </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <h3> View Bookings for PG </h3>
                    <h2> {  } </h2>
                    <p> View all bookings for my PGs </p>
                    <Link to="/owner-bookings">
                        <button style={btnStyle}> View Bookings </button>
                    </Link>
                </div>

                <div style={cardStyle}>
                    <h3> View Payments for PG </h3>
                    <h2> {  } </h2>
                    <p> View all payments for my PGs </p>
                    <button style={btnStyle}> View Payments </button>
                </div>

            </div>

        </div>
    )
}

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px"
};

const cardStyle = {
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "#f9f9f9",
    textAlign: "center"
};

const btnStyle = {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    cursor: "pointer"
};