import { QueryKey, useMutation, useQuery } from "react-query"
import { Panel } from "types/panel"
import { useHttp } from "./http"
import { useAddConfig } from "./use-optimistic-options"


export const usePanel = (param?: Partial<Panel>) => {
    const client = useHttp()
    return useQuery<Panel[]>(
        ["panels", param],
        () => client("panels", { data: param })
    )
}

export const useAddPanel = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Panel>) => {
            return client(`panels`, {
                method: "POST",
                data: params
            })
        },
        useAddConfig(queryKey)
    )
}