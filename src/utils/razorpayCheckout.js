// import axios from "../config/axios";

// const razorpayCheckout = ({ key, order, navigate, onClose }) => {
//     const options = {
//         key,
//         amount: order.amount,
//         currency: "INR",
//         name: "PG Finder",
//         description: "Room Booking Payment",
//         order_id: order.id,

//         handler: async function (response) {
//             try {
//                 await axios.post(
//                     "/api/v1/payment/verify",
//                     {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature
//                     },
//                     {
//                         headers: {
//                             Authorization: localStorage.getItem("token")
//                         }
//                     }
//                 );
//                 alert("Payment Successful 🎉");
//                 navigate("/user-bookings");
//             } catch (err) {
//                 console.error(err);
//                 alert("Payment verification failed");
//             }
//         },

//         modal: {
//             ondismiss: function () {
//                 if (onClose) onClose();
//             }
//         }
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
// };

// export default razorpayCheckout;


import axios from "../config/axios";

const razorpayCheckout = ({ key, order, navigate, onClose }) => {
  const options = {
    key,
    amount: order.amount,
    currency: "INR",
    name: "PG Finder",
    description: "Room Booking Payment",
    order_id: order.id,

    handler: async function (response) {
      try {
        await axios.post(
          "/api/v1/payment/verify",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          },
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        );
        navigate("/payment-success");
      } catch (err) {
        console.error("Payment verify failed", err);
        alert("Payment verification failed");
      }
    },

    modal: {
      ondismiss: function () {
        if (onClose) onClose();
      }
    }
  };

  const razorpay = new window.Razorpay(options);

  razorpay.on("payment.failed", function (response) {
    console.error("Payment failed", response.error);
    alert(response.error.description || "Payment failed");
  });

  razorpay.open();
};

export default razorpayCheckout;
