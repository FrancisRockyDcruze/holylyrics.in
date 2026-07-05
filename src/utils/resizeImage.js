export async function resizeImage(file, maxWidth = 1600) {
try
{

    // alert("1");
  
    const bitmap = await createImageBitmap(file);
  
    // alert("2");
    // alert(bitmap.width + " x " + bitmap.height);
  
    let width = bitmap.width;
    let height = bitmap.height;
  
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  
    // alert("3");
  
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
  
    const ctx = canvas.getContext("2d");
  
    ctx.drawImage(bitmap, 0, 0, width, height);
  
    // alert("4");
  
    bitmap.close();
  
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // alert("5");
  
        if (!blob) {
          reject(new Error("Blob is null"));
          return;
        }
  
        resolve(
          new File([blob], file.name, {
            type: "image/jpeg",
          })
        );
      }, "image/jpeg", 0.9);
    });
}
catch (err) {
    alert(String(err));
  }
}