import { useSearchParams } from "react-router-dom"

export const useUrlQueryParam = (keys: string[]) => {
    const [searchParams, setSearchParam] = useSearchParams()
    return [keys.reduce((prev: {}, key: string) => {
        return {
            ...prev,
            [key]: searchParams.get(key) || ''
        }
    }, {} as { [key in string]: string }), setSearchParam
    ] as const // To tell the ts, it's not an array, but a tuple
}