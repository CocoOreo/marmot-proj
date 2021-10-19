import { useCallback, useReducer, useState } from "react"
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback((...args: T[]) => {
        return (mountedRef.current ? dispatch(...args) : void 0)
    }, [dispatch, mountedRef])
}


export const useAsync = <D>(initialStat?: State<D>) => {
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
        {
            ...defaultInitialStat,
            ...initialStat
        })
    // Lazy initialization 
    // To do this, you can pass an init function as the third argument. The initial state will be set to init(initialArg).
    const [retry, setRetry] = useState(() => () => { })
    const safeDispatch = useSafeDispatch(dispatch)

    const setData = useCallback(
        (data: D) => {
            safeDispatch({
                data,
                stat: "success",
                error: null
            })
        }, [safeDispatch]
    )

    const setError = useCallback(
        (error: Error) => {
            safeDispatch({
                error,
                data: null,
                stat: 'error'
            })
        }, [safeDispatch]
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
            safeDispatch({ stat: "loading" })
            return promise.then((data) => {
                    setData(data)
                return data
            }).catch((error) => {
                setError(error)
                return Promise.reject(error)
            })
        },
        [safeDispatch, setData, setError],
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