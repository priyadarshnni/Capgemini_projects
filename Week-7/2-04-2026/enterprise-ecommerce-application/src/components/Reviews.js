const reviews = [
  { user: "Arjun M.", rating: 5, comment: "Great quality and fast delivery!" },
  { user: "Priya S.", rating: 5, comment: "Exactly as described. Will buy again." },
  { user: "Rahul K.", rating: 4, comment: "Good product, slightly small but overall great." },
];

function Reviews() {
  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>Customer Reviews</h3>
      {reviews.map((r, i) => (
        <div key={i} style={{ borderBottom: "1px solid #eee", paddingBottom: "16px", marginBottom: "16px" }}>
          <strong>{r.user}</strong> &nbsp; {"⭐".repeat(r.rating)}
          <p style={{ color: "#555", marginTop: "6px", fontSize: "0.9rem" }}>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;