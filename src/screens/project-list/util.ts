import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

export const useProjectSearchParams = () => {
    const [params, setParams] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({ ...params, name: String(params.name) || undefined, personId: Number(params.personId) || undefined }), [params]),
        setParams
    ] as const
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])

    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => setProjectCreate({ projectCreate: undefined })

    return {
        projectModalOpen: projectCreate === 'true',
        open,
        close,
    }
}