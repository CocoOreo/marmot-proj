import { useEffect, useState } from "react"

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
        //  The return of useEffect must be a function
        return () => clearTimeout(timer)
    }, [value, delay])
    return debouncedValue
}

