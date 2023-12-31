import { useState } from "react"

export const useFetching = (callback) => {
   const [isLoading, setIsLoading] =  useState(false);
   //обработка ошибок
   const [error, setError] = useState('');

//помещаем сюда текст ошибки
    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}
export default useFetching