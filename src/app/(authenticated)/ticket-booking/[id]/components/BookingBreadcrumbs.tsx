import { ArrowRight, CheckIcon } from "lucide-react";
import React from "react";
import { AiOutlineInsertRowBelow } from "react-icons/ai";
import { FaCreditCard } from "react-icons/fa";

function BreadcrumbStep({ color, icon, text, background }) {
    return (
        <div className="flex flex-col items-center mx-2">
            <div className={`flex items-center justify-center w-12 h-12 text-${color} bg-${background} rounded-full`}>
                {icon}
            </div>
            <p className={`font-bold text-xs mt-1 text-${color}`}>{text}</p>
        </div>
    );
}

const pageSteps = {
    "choose-ticket": [
        { background: "emerald-400 text-white", color: "emerald-400", icon: <AiOutlineInsertRowBelow size={25} />, text: "CHỌN VÉ" },
        { background: "white", color: "gray-400", icon: <FaCreditCard size={25} />, text: "THANH TOÁN" },
        { background: "white", color: "gray-400", icon: <CheckIcon size={25} />, text: "HOÀN TẤT" },
    ],
    "payment": [
        { background: "white", color: "emerald-400", icon: <AiOutlineInsertRowBelow size={25} />, text: "CHỌN VÉ" },
        { background: "emerald-400 text-white", color: "emerald-400", icon: <FaCreditCard size={25} />, text: "THANH TOÁN" },
        { background: "white", color: "gray-400", icon: <CheckIcon size={25} />, text: "HOÀN TẤT" },
    ],
    "completed": [
        { background: "white", color: "emerald-400", icon: <AiOutlineInsertRowBelow size={25} />, text: "CHỌN VÉ" },
        { background: "white", color: "emerald-400", icon: <FaCreditCard size={25} />, text: "THANH TOÁN" },
        { background: "emerald-400 text-white", color: "emerald-400", icon: <CheckIcon size={25} />, text: "HOÀN TẤT" },
    ],
};

export function BookingBreadcrumbs({ page }) {
    const steps = pageSteps[page] || [];

    return (
        <div className="pt-10 pb-10">
            {steps.length > 0 ? (
                <div className="flex flex-row justify-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbStep {...step} />
                            {index < steps.length - 1 && <ArrowRight className="text-gray-400 mx-6 mt-3" />}
                        </React.Fragment>
                    ))}
                </div>
            ) : null}
        </div>
    );
}