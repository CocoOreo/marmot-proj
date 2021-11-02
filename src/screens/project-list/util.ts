import { useMemo } from "react"
import { useProject } from "utils/project"
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url"

export const useProjectSearchParams = () => {
    const [params, setParams] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(
            () => ({ ...params, name: String(params.name) || undefined, personId: Number(params.personId) || undefined }), [params]),
        setParams
    ] as const
}

export const useProjectsQueryKey = () => {
    const [params] = useProjectSearchParams()
    return ['projects', params]
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        'projectCreate',
    ])

    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId',
    ])
    const { data: editingProject, isLoading, } = useProject(Number(editingProjectId))

    const setUrlParams = useSetUrlSearchParam();

    const open = () => {
        setProjectCreate({ projectCreate: true })
    }
    const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' })
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}