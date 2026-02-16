import { useState, useEffect } from "react";

export default function useCurrency() {

    const [currency, setCurrency] = useState("INR");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCurrency() {
            try {
                const url = import.meta.env.DEV ? "/mock-location.json" : "/api/location";

                const res = await fetch(url);
                const data = await res.json();

                setCurrency(data.country === "IN" ? "INR" : "USD");

            } catch (error) {
                setCurrency("INR")
            } finally {
                setLoading(false);
            }
        }

        fetchCurrency();
    }, []);

    return { currency, loading, setCurrency };
}