export function printPDF() {
    const printContents = document.getElementById("printPdf").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents; // replace body with print content
    window.print(); // open print dialog
    document.body.innerHTML = originalContents; // restore original body
    window.location.reload(); // reset React state
}