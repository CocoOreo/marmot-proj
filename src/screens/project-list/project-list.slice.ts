import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
interface State {
    projectModalOpen: boolean;
}

const initialState: State = {
    projectModalOpen: false
}

export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        // Immer is built into redux toolkit
        // Usually, we need to return a new object
        // Like {...state, projectModalOpen: true }
        openProjectModal(state){
            state.projectModalOpen = true
        },
        closeProjectModal(state) {
            state.projectModalOpen = false
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen