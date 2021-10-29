import { useMutation, useQuery, useQueryClient } from "react-query"
import { Project } from "types/project"
// import { cleanObject } from "utils"
import { useHttp } from "./http"

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    return useQuery<Project[]>(["projects", param], () => client("projects", { data: param }))
}

export const useEditProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) => {
        return client(`projects/${params.id}`, {
            method: "PATCH",
            data: params
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries('projects')
    })
}

export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) => {
            return client(`projects/${params.id}`, {
                method: "POST",
                data: params
            })
        }, {
            onSuccess: () => queryClient.invalidateQueries('projects')
        }
    )
}