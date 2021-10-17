import { useCallback, useEffect } from "react"
import { Project } from "types/project"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run: getList, ...result } = useAsync<Project[]>()
    const fetchProjects = useCallback(
        () => client('projects', { data: cleanObject(param || {}) }),
        [client, param],
    )
    useEffect(() => {
        getList(fetchProjects(), {
            retry: fetchProjects
        })
    }, [param, getList, fetchProjects])
    return result
}

export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(
            `projects/${params.id}`, {
            data: params,
            method: 'PATCH',
        }
        ))
    }
    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(
            `projects/${params.id}`, {
            data: params,
            method: 'POST',
        }
        ))
    }
    return {
        mutate,
        ...asyncResult
    }
}