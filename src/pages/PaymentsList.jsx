import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminPayments, fetchOwnerPayments, fetchUserPayments } from "../slices/payment-slice";

export default function PaymentsList() {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  const { payments, loading } = useSelector((state) => {
    return state.payment;
  });

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") {
      dispatch(fetchAdminPayments());
    } else if (user.role === "owner") {
      dispatch(fetchOwnerPayments());
    } else {
      dispatch(fetchUserPayments());
    }
  }, [dispatch, user]);

  if (loading) {
    return <h3> loading payments... </h3>;
  }

  return (
    <div className="container">
      <h1>Payments</h1>

      <p>Showing {payments.length} payment(s)</p>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>PG</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Booking</th>
              <th>Paid By</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <td>{index + 1}</td>
                <td>{pay.pgId?.pgname}</td>
                <td>₹{pay.amount}</td>
                <td>{pay.paymentStatus}</td>
                <td>{pay.bookingId?._id}</td>
                <td>{pay.userId?.name || "You"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />

      <div>
        <Link to="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
