import { useQuery } from "react-query"
import { Panel } from "types/panel"
import { useHttp } from "./http"


export const usePanel = (param?: Partial<Panel>) => {
    const client = useHttp()
    return useQuery<Panel[]>(
        ["panels", param],
        () => client("panels", { data: param })
    )
}