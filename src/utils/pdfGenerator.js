export function printPDF() {
    // e.preventDefault();
    const printContents = document.getElementById("printPdf").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents; // replace body with print content
    window.print(); // open print dialog
    document.body.innerHTML = originalContents; // restore original body
    window.location.reload(); // reset React state
}

// export function printPDF()
// {
//   e.preventDefault();

//   const printContents = document.getElementById("printPdf");
//   if (!printContents) return;

//   // Create a hidden iframe
//   const iframe = document.createElement("iframe");
//   iframe.style.position = "absolute";
//   iframe.style.width = "0px";
//   iframe.style.height = "0px";
//   iframe.style.border = "none";
//   document.body.appendChild(iframe);

//   const doc = iframe.contentDocument || iframe.contentWindow?.document;
//   if (!doc) return;

//   // Build the HTML structure without document.write
//   const html = document.createElement("html");
//   const head = document.createElement("head");
//   const body = document.createElement("body");

//   // Clone all stylesheet links
//   document.querySelectorAll("link[rel=stylesheet], style").forEach((node) => {
//     head.appendChild(node.cloneNode(true));
//   });

//   // Clone the content you want to print
//   body.appendChild(printContents.cloneNode(true));

//   html.appendChild(head);
//   html.appendChild(body);
//   doc.replaceChild(html, doc.documentElement); // replace the iframe's document

//   // Print and remove iframe
//   iframe.contentWindow.focus();
//   iframe.contentWindow.print();
//   document.body.removeChild(iframe);
// }