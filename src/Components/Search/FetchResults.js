import React, { useState, useEffect  } from 'react';
import axios from 'axios';

const useFetchData = ({ token, startDate, endDate }) => {

    const JSONstartDate = JSON.stringify(startDate).replace(/"/g, ''); // date converted to JSON format
    const JSONendDate = JSON.stringify(endDate).replace(/"/g, ''); // date converted to JSON format

    const [data, setData] = useState(null); 
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            
            setLoading(true); // remove this?

            try {
                const { data: response } = await axios.get(`${process.env.REACT_APP_URL_SEARCH}/${JSONstartDate}/${JSONendDate}`, {
                    headers: { Authorization: `Bearer ${token}` }
                    });
                setData(response);
                setStatus(200);
                //console.log(`response.data1: ${response}`);
                //console.log(`response.status1: ${status}`);
            } catch (error) {
                setStatus('error2');
                //console.log(`response.data2: ${data}`);
                //console.log(`response.status2: ${status}`);
            }

            setLoading(false); // remove this?

        };
        fetchData();
    }, [token, JSONstartDate, JSONendDate]);

    return {
        status, data, loading
    };
};

export default useFetchData;