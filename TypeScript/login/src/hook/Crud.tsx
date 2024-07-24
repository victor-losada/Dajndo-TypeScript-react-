import axios from 'axios'
import React, { useState } from 'react'

const Crud = (BASEURL: string, path = '') => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState<Error | null>(null);

    const getApi = () => {
        const url = `${BASEURL}${path}`
        axios.get(url)
        .then(res => {
            setResponse(res.data)
        })
        .catch(err => console.error("Error en la operacion",err))
    }

    const postApi = async (data: any) => {
        const url = `${BASEURL}${path}`;
        try {
            const result = await axios.post(url, data);
            return result.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || error.message);
            } else {
                // Aquí se tipa explícitamente 'error' como 'Error' para asegurar su tipo
                setError(error as Error);
            }
            // Aquí también se puede tipar explícitamente 'error' para evitar TS18046
            throw new Error(typeof error.response !== 'undefined' ? error.response.data.message : error.message);
        }
    };
    
    return [response, getApi, postApi]
}

export default Crud