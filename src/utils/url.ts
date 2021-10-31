import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams()
    const setSearchParams = useSetUrlSearchParam();
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
            return setSearchParams(params)
        }
    ] as const // To tell the ts, it's not an array, but a tuple
}

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    };
  };