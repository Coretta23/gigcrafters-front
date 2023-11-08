import { useState, useEffect, useContext } from "react";

export default function useFetch(url, method="GET", sentData={}, headers) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...headers,
        },
        method: method,
        body: JSON.stringify(sentData)
    };

    useEffect(() => {
        setIsLoading(true);
        setError(false);

        async function fetchData() {
            try {
                const response = await fetch(url, requestOptions);
                const data = await response.json();

                setData(data);
            } catch (error) {
                setError(true);

                if (!url) {
                    console.log("no URL given, please provide and URL to proceed.");
                } else {
                    console.log("fetch error :", error);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url, method, headers, sentData]);

    return {data, isLoading, error};
};
