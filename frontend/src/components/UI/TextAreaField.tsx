import React from 'react';

type TextAreaFieldProps = {
    id: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
    id,
    label,
    name,
    value,
    onChange,
    required = false,
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-green-700 mb-1">
                {label}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full p-1 border border-green-700 rounded-md"
                rows={2}
            />
        </div>
    );
};
