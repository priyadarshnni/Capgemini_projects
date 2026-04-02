import { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);
  const inputStyle = { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "12px", fontSize: "0.95rem" };

  return (
    <div style={{ maxWidth: "480px" }}>
      <h1 style={{ marginBottom: "24px" }}>Contact Us</h1>
      {sent ? (
        <p style={{ color: "green" }}>✅ Message sent! We'll get back to you soon.</p>
      ) : (
        <>
          <input style={inputStyle} placeholder="Your Name" />
          <input style={inputStyle} placeholder="Email" type="email" />
          <textarea style={{ ...inputStyle, height: "120px", resize: "vertical" }} placeholder="Message" />
          <button onClick={() => setSent(true)} style={{ padding: "10px 24px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px" }}>Send</button>
        </>
      )}
    </div>
  );
}

export default Contact;