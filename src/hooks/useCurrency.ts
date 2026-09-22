import { useState } from "react";

export default function useCurrency() {

    const [currency] = useState("INR");
    const [loading] = useState(false);

    const setCurrency = () => {
        console.warn("setCurrency is deprecated as only INR is supported.");
    };

    return { currency, loading, setCurrency };
}