import { getInitials } from "../services/checkAdminAccess"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Logout({isAdmin, setIsAdmin}){
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const location = useLocation();

    //logout Admin
    const handleLogout = () => {
    localStorage.removeItem("admin_token"); // don't clear everything

    setIsAdmin(null);      // <-- this is important

    navigate("/");
    setShowMenu(false);
};

    useEffect(() => {
        setShowMenu(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    return (
        <div ref={menuRef} className="flex justify-center flex-col items-center relative" onClick={() => setShowMenu(prev => !prev)}>
            <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
                {getInitials(user)}
            </div>
            <span className="absolute bottom-5 -right-0.5 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <h1 className="text-bgColor bg-bglightColor rounded px-1 mt-1 text-xs font-bold">Admin</h1>

            {showMenu && (
            <div className="absolute top-full mt-2  mr-1 bg-white border rounded shadow-md text-sm z-50 text-gray-700">
                <button 
                onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 pointer"
                >
                Logout
                </button>
            </div>
            )}
        </div>
    )
}