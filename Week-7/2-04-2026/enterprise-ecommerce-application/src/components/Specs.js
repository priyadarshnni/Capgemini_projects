function Specs() {
  const specs = [["Material", "100% Cotton"], ["Fit", "Regular"], ["Sizes", "S, M, L, XL"], ["Weight", "180 GSM"], ["Care", "Machine wash cold"]];
  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>Specifications</h3>
      {specs.map(([key, val]) => (
        <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee", fontSize: "0.9rem" }}>
          <span style={{ color: "#555" }}>{key}</span>
          <span>{val}</span>
        </div>
      ))}
    </div>
  );
}

export default Specs;