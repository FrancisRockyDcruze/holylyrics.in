export const checkAccess = async (userId, phone) => {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbzoRXP0X3eDamDXXB9uP7uWsPKSPmiU486Vu3bVN1RPST49-kT-LKXOxPI1TdsKFqA/exec", {
      method: "POST",
      body: JSON.stringify({
        id: userId,
        mobileNumber: phone
      })
    });

    const data = await res.json();
    return data;

  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join("");
};