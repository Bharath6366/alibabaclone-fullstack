const { Resend } =
  require("resend");

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

const sendMail = async ({
  to,
  customerName = "Customer",
  subject,
  orderId = "",
  status = "",
  total = "",
  paymentMethod = "",
  html,
  attachments = [],
}) => {
  try {
    const statusMessage =
      status === "Pending"
        ? "Your order has been placed successfully and is now being prepared."
        : status ===
            "Shipped"
        ? "Good news — your order has been shipped and is on its way."
        : status ===
            "Out for Delivery"
        ? "Your package is out for delivery and should reach you shortly."
        : status ===
            "Delivered"
        ? "Your order has been delivered successfully. We hope you enjoy your purchase."
        : "Your order status has been updated.";

    const statusColor =
      status === "Delivered"
        ? "#16a34a"
        : status ===
            "Out for Delivery"
        ? "#2563eb"
        : status ===
            "Shipped"
        ? "#7c3aed"
        : "#ff6a00";

    const finalHtml =
      html ||
      `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Alibaba Store</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

<div style="max-width:680px;margin:40px auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,.08);">

  <div style="background:linear-gradient(135deg,#ff6a00,#ff9500);padding:30px 40px;color:white;">
    <h1 style="margin:0;font-size:30px;font-weight:800;">
      Alibaba Store
    </h1>

    <p style="margin:8px 0 0;font-size:15px;opacity:.95;">
      Smart Shopping. Trusted Delivery.
    </p>
  </div>

  <div style="padding:42px;">
    <h2 style="margin:0 0 18px;color:#111827;">
      Hello ${customerName},
    </h2>

    <p style="font-size:16px;color:#4b5563;line-height:1.8;margin-bottom:28px;">
      ${statusMessage}
    </p>

    <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:16px;padding:24px;">
      <p style="margin:0 0 14px;">
        <strong>Order ID:</strong>
        ${orderId}
      </p>

      <p style="margin:0 0 14px;">
        <strong>Status:</strong>
        <span style="color:${statusColor};font-weight:700;">
          ${status}
        </span>
      </p>

      <p style="margin:0 0 14px;">
        <strong>Payment:</strong>
        ${paymentMethod}
      </p>

      <p style="margin:0;font-size:18px;">
        <strong>Total:</strong>
        <span style="color:#16a34a;font-weight:800;">
          ₹${total}
        </span>
      </p>
    </div>

    <div style="text-align:center;margin-top:34px;">
      <a
        href="http://localhost:5173/orders"
        style="
          display:inline-block;
          text-decoration:none;
          background:#111827;
          color:white;
          padding:14px 28px;
          border-radius:12px;
          font-weight:700;
        "
      >
        Track Order
      </a>
    </div>
  </div>

  <div style="background:#111827;padding:24px;color:#d1d5db;text-align:center;font-size:14px;">
    © 2026 Alibaba Store · Secure Payments · Fast Delivery
  </div>

</div>

</body>
</html>
`;

    await resend.emails.send({
      from:
        "onboarding@resend.dev",
      to,
      subject,
      html: finalHtml,
      attachments,
    });

    console.log(
      "Mail sent:",
      to
    );
  } catch (err) {
    console.log(
      "Mail error:",
      err.message
    );
  }
};

module.exports = sendMail;