let spinbtn = document.getElementById('spinbtn');
const EngSel = document.querySelector('#select');
const HinSel = document.querySelector('#select-hin');
const BenSel = document.querySelector('#select-ben');
let imgElement = document.createElement("img");

async function getTextFromImage(lang) {
    let cnvsImg = document.querySelector('#cnvsImg');
    // const dataURL = cnvsImg.toDataURL("image/jpeg", 1.0);
    const dataURL = cnvsImg.toDataURL();
    const worker = await Tesseract.createWorker(lang);
    // const res = await worker.recognize(fSel.files[0]);
    const res = await worker.recognize(dataURL);
    let data = new FormData();
    data.append("text", res.data.text);
    fetch("Add_Songs.php", {method: "POST", body:data })
    .then( dataTxt => {
        dataTxt = res.data.text.replace(/\|/g, "I");
        let songName = dataTxt.split('\n')[0];
        document.querySelector('#songName').value = songName;
        document.querySelector('#songs').value = dataTxt;
    })
    .catch(err => console.error(err))
    .finally(spinbtn.setAttribute('hidden',''));
    await worker.terminate();
}

let mainImage = (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}

imgElement.onload = () => {
    let mat = cv.imread(imgElement);
    let dst = new cv.Mat();
    let ksize = new cv.Size(3, 3);

    let low = new cv.Mat(mat.rows, mat.cols, mat.type(), [0, 0, 0, 0]);
    let high = new cv.Mat(mat.rows, mat.cols, mat.type(), [150, 150, 150, 255]);
    // You can try more different parameters
    // cv.inRange(mat, low, high, dst);
    // cv.cvtColor(mat, mat, cv.COLOR_RGBA2RGB, 0);
    // You can try more different parameters
    // cv.bilateralFilter(mat, dst, 9, 75, 75, cv.BORDER_DEFAULT);

    cv.GaussianBlur(mat, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
    cv.imshow('cnvsImg', dst);
    mat.delete(); dst.delete(); low.delete(); high.delete();
}

EngSel.onchange = (e) => {
    spinbtn.removeAttribute('hidden');
    document.querySelector('#songs').value = " ";
    document.querySelector('#songName').value = " ";
    document.querySelector('[name ="language"]').value = "English";
    mainImage(e);
    setTimeout(function() {
        getTextFromImage('eng');
    }, 2000);
}
HinSel.onchange = (e) => {
    spinbtn.removeAttribute('hidden');
    document.querySelector('#songs').value = " ";
    document.querySelector('#songName').value = " ";
    document.querySelector('[name ="language"]').value = "Hindi";
    mainImage(e);
    setTimeout(function() {
        getTextFromImage('hin');
    }, 2000);
}
BenSel.onchange = (e) => {
    spinbtn.removeAttribute('hidden');
    document.querySelector('#songs').value = " ";
    document.querySelector('#songName').value = " ";
    document.querySelector('[name ="language"]').value = "Bengali";
    mainImage(e);
    setTimeout(function() {
        getTextFromImage('ben');
    }, 2000);
}