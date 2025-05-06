import { useContext } from "react";
import { CardContext, CardContextType } from "./cardContext";

export const useCard = (): CardContextType => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error("useCard must be used within a CardProvider");
    }
    return context;
}
