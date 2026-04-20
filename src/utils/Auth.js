export const isAdmin = () => {
  return !!localStorage.getItem("admin_token");
};

export const logout = () => {
  localStorage.removeItem("admin_token");
};