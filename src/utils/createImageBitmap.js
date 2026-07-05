export async function resizeImage(file, maxWidth = 1600) {
  return new Promise((resolve) => {
    const img = new Image();

            alert("image high2")


    img.onload = () => {
      const canvas = document.createElement("canvas");

      let { width, height } = img;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;

        alert("image high")
      }

      canvas.width = width;
      canvas.height = height;

      canvas
        .getContext("2d")
        .drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          resolve(new File([blob], file.name, {
            type: "image/jpeg",
          }));
        },
        "image/jpeg",
        0.9
      );
    };

    alert("after onload")

    img.src = URL.createObjectURL(file);
  });
}