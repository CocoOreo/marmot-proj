import { useEffect } from "react";
import { Director } from "types/director";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useDirectors = (param?: Partial<Director>) => {
    const { run: getDirectors, ...res } = useAsync<Director[]>()
    const client = useHttp()

    useEffect(() => {
        getDirectors(client('users', { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return res
}