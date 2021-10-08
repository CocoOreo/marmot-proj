import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(
            () => keys.reduce((prev, key) => {
                return {
                    ...prev,
                    [key]: searchParams.get(key) || ''
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, {} as { [key in K]: string }), [searchParams]
        )
        ,
        (params: Partial<{ [key in K]: unknown }>) => {
            const res = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as unknown as URLSearchParams
            return setSearchParam(res)
        }
    ] as const // To tell the ts, it's not an array, but a tuple
}