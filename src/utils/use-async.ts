import { useState } from "react"

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

    const setData = (data: D) => {
        setState({
            data,
            stat: "success",
            error: null
        })
    }
    const setError = (error: Error) => {
        setState({
            error,
            data: null,
            stat: 'error'
        })
    }
    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error("run can only receive a promise")
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        setState({ ...state, stat: "loading" })
        return promise.then((data) => {
            setData(data)
            return data
        }).catch((error) => {
            setError(error)
            return error
        })
    }

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