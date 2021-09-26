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
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error("run can only receive a promise")
        }
        setState({ ...state, stat: "loading" })
        return promise.then((data)=>{
            setData(data)
            return data
        }).catch((error) =>{
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
        setData,
        setError,
        ...state
    }
}