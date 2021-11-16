import { QueryKey, useMutation, useQuery } from "react-query"
import { Task } from "types/task"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options"


export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()
    return useQuery<Task[]>(
        ["tasks", param],
        () => client("tasks", { data: param })
    )
}
export const useTask = (id?: number) => {
    const client = useHttp()
    return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
        // Only trigger useQuery when id is not 'undefined'.
        enabled: Boolean(id)
    })
}
export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Task>) => {
            return client(`tasks`, {
                method: "POST",
                data: params
            })
        },
        useAddConfig(queryKey)
    )
}

export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Task>) => {
            return client(`tasks/${params.id}`, {
                method: "PATCH",
                data: params
            })
        },
        useEditConfig(queryKey)
    )
}

export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        ({ id }: { id: number }) => {
            return client(`tasks/${id}`, {
                method: "DELETE",
            })
        },
        useDeleteConfig(queryKey)
    )
}