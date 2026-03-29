import axios from "axios";

const API_URL = "https://docs.google.com/spreadsheets/d/1nYe75GdaoZSAZolxb5h1VaqaJ3PSrFa2IWNLO-UcY9Q/gviz/tq?tqx=out:json&gid=0";

export const getSongs = async () => {
  try {
    const res = await axios.get(API_URL);

    // Remove Google wrapper
    const jsonData = JSON.parse(res.data.substr(47).slice(0, -2));

    // Map rows into JS objects
    const rows = jsonData.table.rows.map((row) => {
      let obj = {};
      row.c.forEach((cell, i) => {
        obj[jsonData.table.cols[i].label] = cell?.v || "";
      });
      return obj;
    });

    return rows;
  } catch (err) {
    console.error("Error fetching songs:", err);
    return [];
  }
};