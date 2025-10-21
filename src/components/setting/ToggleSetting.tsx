// components/ToggleSetting.tsx
import React from 'react';

interface ToggleSettingProps {
    label: string;
    description: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

export const ToggleSetting: React.FC<ToggleSettingProps> = ({
    label,
    description,
    enabled,
    onChange,
}) => {
    return (
        <div className="flex items-center justify-between p-6 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <div className="flex-1">
                <div className="font-black text-lg text-black">{label}</div>
                <div className="text-sm text-gray-700 font-medium mt-1">{description}</div>
            </div>
            <button
                onClick={() => onChange(!enabled)}
                className={`relative w-16 h-8 rounded-full border-2 border-black transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${enabled ? 'bg-green-400 hover:bg-green-300' : 'bg-gray-300 hover:bg-gray-200'
                    }`}
            >
                <div
                    className={`absolute top-1/2 w-6 h-6 rounded-full bg-white border-2 border-black transform transition-all duration-300 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${enabled ? 'translate-x-8 -translate-y-1/2' : 'translate-x-1 -translate-y-1/2'
                        }`}
                />
            </button>
        </div>
    );
};