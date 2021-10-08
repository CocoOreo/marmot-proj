import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

export const useProjectSearchParams = () => {
    const [params, setParams] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({ ...params, personId: Number(params.personId) || undefined }), [params]),
        setParams
    ] as const
}