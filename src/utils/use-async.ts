import { useCallback, useState } from "react"
import { useMountedRef } from "./use-mounted-ref"

interface State<D> {
    data: D | null;
    error: Error | null;
    stat: "idle" | "loading" | "success" | "error";
}

const defaultInitialStat: State<null> = {
    stat: "idle",
    error: null,
    data: null
}

export const useAsync = <D>(initialStat?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialStat,
        ...initialStat
    })
    // Lazy initialization 
    // To do this, you can pass an init function as the third argument. The initial state will be set to init(initialArg).
    const [retry, setRetry] = useState(() => () => { })
    const mountedRef = useMountedRef()

    const setData = useCallback(
        (data: D) => {
            setState({
                data,
                stat: "success",
                error: null
            })
        }, []
    )
    
    const setError = useCallback(
        (error: Error) => {
            setState({
                error,
                data: null,
                stat: 'error'
            })
        }, []
    )

    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error("run can only receive a promise")
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig)
                }
            })
            setState(pre => ({ ...pre, stat: "loading" }))
            return promise.then((data) => {
                if (mountedRef.current) {
                    setData(data)
                }
                return data
            }).catch((error) => {
                setError(error)
                return Promise.reject(error)
            })
        },
        [mountedRef, setData, setError],
    )

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        retry,
        setData,
        setError,
        ...state
    }
}