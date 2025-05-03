import React from "react";
import PlusIcon from "./icon/PlusIcon";

type Props = {
    children: React.ReactNode;
    isOpenFAB: boolean;
    onClose: () => void;

};

export const FAB = ({ children, isOpenFAB, onClose }: Props) => {

    return (
        <>
            <div className="block">
                {isOpenFAB ? (
                    <>
                        <div
                            className="fixed sm:absolute inset-0 bg-black/50 z-40"
                            onClick={onClose}
                        />
                        <div className="fixed sm:absolute bottom-10 right-6 z-50">
                            {children}
                        </div>
                    </>
                ) : (
                    <div className="fixed sm:absolute bottom-10 right-6">
                        <button
                            className="rounded-full shadow-lg px-3 py-3 bg-green-600 text-white hover:bg-green-500 active:bg-green-400 transition-all duration-200 ease-in-out"
                            onClick={onClose}
                        >
                            <span><PlusIcon /></span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
