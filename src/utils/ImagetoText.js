import Tesseract from "tesseract";

let worker = null;
let currentLang = null;

const initWorker = async (lang) => {
  if (!worker || currentLang !== lang) {
    if (worker) {
      await worker.terminate();
    }

    worker = await Tesseract.createWorker(lang, 1, {
    //   logger: (m) => console.log(m),
    });

    currentLang = lang;
  }
};

export const getTextfromImage = async (file, lang = "eng") => {
  if (!file) return "";

  try {
    await initWorker(lang);

    const { data } = await worker.recognize(file);

    // console.log(data.text);
    return data.text;

  } catch (error) {
    console.error("OCR Error:", error);
    return "";
  }
};