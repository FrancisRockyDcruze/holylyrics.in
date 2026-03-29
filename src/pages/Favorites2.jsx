import React from "react";

export default function ExtraPrintExample() {
  const handlePrint = () => {
    const printContents = document.getElementById("printPdf").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents; // replace body with print content
    window.print(); // open print dialog
    document.body.innerHTML = originalContents; // restore original body
    window.location.reload(); // reset React state
  };

  // Example dynamic content
  const leftCol_Arr = ["Left 1", "Left 2", "Left 3"];
  const rightCol_Arr = ["Right A", "Right B", "Right C"];
  const displayHeader = "My Print Header";
  const totalPg = 3;

  return (
    <div>
      <div
        id="printPdf"
        style={{
          border: "1px solid black",
          padding: "20px",
          background: "#f4f1ea",
        }}
      >
        {displayHeader && <h2>{displayHeader}</h2>}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {leftCol_Arr.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
          <div>
            {rightCol_Arr.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>

        <p>Total Pages: {totalPg}</p>
      </div>

      <button
        onClick={handlePrint}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Print
      </button>
    </div>
  );
}