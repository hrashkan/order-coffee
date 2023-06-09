import { useState, useEffect } from 'react';


const useFetchData = (table) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/${table}`)
                const data = await res.json();
                setData(data);
                setError(null);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                console.log(error)
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [table]);

    return { data, loading, error };
};


export default useFetchData