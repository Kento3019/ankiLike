import { useState, useRef, useEffect } from "react";

type MenuItem = {
    label: string;
    onClick: () => void;
};

type KebabMenuProps = {
    items: MenuItem[];
};

export default function KebabMenu({ items }: KebabMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // 外クリックでメニューを閉じる
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                className="px-2 hover:bg-gray-100 rounded"
                onClick={() => setOpen(!open)}
            >
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-2 w-40 bg-white border border-gray-300 rounded shadow z-10">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 active:bg-gray-300 transition-all duration-200"
                            onClick={() => {
                                item.onClick();
                                setOpen(false);
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
