import { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import SelectLanguage from "../components/SelectLanguage";

export default function BengaliMass ()
{
    const navigate = useNavigate();
    const [showLanguages, setShowLanguages] = useState(false);

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="p-4 flex justify-between items-center border-b bg-bgColor">
            <SelectLanguage/>
            
            <h2 className="text-2xl text-bglightColor font-bold mr-3">Bengali Mass</h2>
            <div className="text-xl text-bgColor border rounded px-3 py-0 bg-bglightColor" onClick={() => navigate("/")}>🏠︎</div>
            </div>

            <div className="p-4 flex flex-col space-y-2 bg-bglightColor mb-3 overflow-y-auto flex-1">
            <p>Soon it will be seen here...</p>
            <p>Work in Progress</p>
            <Footer/>
            </div>
        </div>
    )
} 