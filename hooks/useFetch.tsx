import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/src/utils/api";




const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<String>('');

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError('');

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;