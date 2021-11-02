import { QueryKey, useMutation, useQuery } from "react-query"
import { Project } from "types/project"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options"

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    return useQuery<Project[]>(["projects", param], () => client("projects", { data: param }))
}

export const useProject = (id?: number) => {
    const client = useHttp()
    return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
        // Only trigger useQuery when id is not 'undefined'.
        enabled: Boolean(id)
    })
}

export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Project>) => {
            return client(`projects/${params.id}`, {
                method: "PATCH",
                data: params
            })
        },
        useEditConfig(queryKey)
    )
}

export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Project>) => {
            return client(`projects`, {
                method: "POST",
                data: params
            })
        },
        useAddConfig(queryKey)
    )
}

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        ({ id }: { id: number }) => {
            return client(`projects/${id}`, {
                method: "DELETE",
            })
        },
        useDeleteConfig(queryKey)
    )
}
