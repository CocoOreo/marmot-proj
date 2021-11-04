import { useLocation } from "react-router"
import { useProject } from "utils/project"

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl  = () => useProject(useProjectIdInUrl())

export const usePannelSearchParams = () => ({projectId: useProjectIdInUrl()})

export const usePannelQueryKey = () => ['pannels', usePannelSearchParams()]

export const useTasksSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useTasksQueryKey = () => ['pannels', useTasksSearchParams()]