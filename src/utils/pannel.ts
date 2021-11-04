import { useQuery } from "react-query"
import { Pannel } from "types/pannel"
import { useHttp } from "./http"


export const usePannel = (param?: Partial<Pannel>) => {
    const client = useHttp()
    return useQuery<Pannel[]>(
        ["pannels", param],
        () => client("pannels", { data: param })
    )
}