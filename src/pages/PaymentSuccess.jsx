import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/payment-list");
    }, 2000);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Your booking has been confirmed.</p>
      <p>Redirecting to payment history...</p>
    </div>
  );
}
