import React from "react";

interface InputProps {
    className?: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type = "text", placeholder, value, className, onChange }) => {
    return (
        <div className="w-full">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${className} w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:border-green-700`}
            />
        </div>
    );
};

export default Input;
