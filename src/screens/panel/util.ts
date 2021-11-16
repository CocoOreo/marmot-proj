import { useCallback, useMemo } from "react"
import { useLocation } from "react-router"
import { useProject } from "utils/project"
import { useTask } from "utils/task"
import { useUrlQueryParam } from "utils/url"
import { useDebounce } from "utils/use-debounce"

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const usePanelSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const usePanelQueryKey = () => ['panels', usePanelSearchParams()]

export const useTasksSearchParams = () => {
    const [param] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl()
    const debouncedName = useDebounce(param.name, 200)
    return useMemo(() => {
        return {
            projectId,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
            name: debouncedName || undefined,
        }
    }, [projectId, param, debouncedName])
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTasksModal = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
    const startEdit = useCallback((id: number) => {
        setEditingTaskId({ editingTaskId: id })
    }, [setEditingTaskId])
    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: '' })
    }, [setEditingTaskId])
    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }
}