export const AdminAccess = () => {
    const token = localStorage.getItem("admin_token");
    if (token)
    {
        return true;
    }
    else
    {
        return false;
    }
}