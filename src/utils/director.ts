import { Director } from "types/director";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useMount } from "./use-mount";

export const useDirectors = (param?: Partial<Director>) => {
    const { run: getDirectors, ...res} = useAsync<Director[]>()
    const client = useHttp()
    useMount(() => {
        getDirectors(client('users'))
    })
    return res
}