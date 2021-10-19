import { useCallback, useReducer } from "react"

const SET = 'SET'
const RESET = 'RESET'
const REDO = 'REDO'
const UNDO = 'UNDO'

type UndoState<T> = { present: T, future: T[], past: T[] }

type UndoAction<T> = {
    newPresent?: T,
    type: typeof SET | typeof RESET | typeof REDO | typeof UNDO
}

const undoReducer = <T>(state: UndoState<T>, action: UndoAction<T>) => {
    const { present, past, future, } = state
    const { newPresent } = action
    switch (action.type) {
        case SET: {
            if (newPresent === present)
                return state
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        }
        case RESET: {
            return {
                past: [],
                future: [],
                present: newPresent,
            }
        }
        case REDO: {
            if (future.length === 0)
                return state
            const next = future[0]
            const newFuture = future.slice(1)
            return {
                future: newFuture,
                past: [...past, present],
                present: next
            }
        }
        case UNDO: {
            if (past.length === 0)
                return state
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        }
    }
}

export const useUndo = <T>(initialProsent: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        present: initialProsent,
        future: [],
        past: []
    } as UndoState<T>)
    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0
    const undo = useCallback(() => { dispatch({ type: UNDO }) }, [])
    const redo = useCallback(() => { dispatch({ type: REDO }) }, [])
    const set = useCallback((newPresent: T) => { dispatch({ newPresent, type: SET }) }, [])
    const reset = useCallback((newPresent: T) => { dispatch({ newPresent, type: RESET }) }, [])


    return [
        state,
        { set, reset, undo, redo, canUndo, canRedo }
    ] as const
}

