// components/ChannelInput.tsx
import React from 'react';

interface ChannelInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export const ChannelInput: React.FC<ChannelInputProps> = ({
    label,
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className="space-y-3">
            <label className="font-black text-lg text-black">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-4 bg-white border-2 border-black rounded-xl font-mono font-medium text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:border-cyan-400 focus:translate-x-0.5 focus:translate-y-0.5 placeholder:text-gray-500"
                />
                {/* Focus indicator dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 border border-black rounded-full opacity-0 transition-opacity duration-300 focus-within:opacity-100"></div>
            </div>
        </div>
    );
};