import { useEffect } from "react"
import { Project } from "types/project"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run:getList, ...result } = useAsync<Project[]>()
    useEffect(() => {
        getList(client('projects', { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
}