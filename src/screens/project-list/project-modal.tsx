import { Drawer } from "antd"
import React from "react"
import { useDispatch } from 'react-redux'
import { projectListActions } from "./project-list.slice"


export const ProjectModal = (props: { projectModalOpen: boolean, onClose: () => void }) => {
    const dispatch = useDispatch()
    return (
        <div>
            <Drawer onClose={()=>{dispatch(projectListActions.closeProjectModal())}} visible={props.projectModalOpen} width={'100%'}>
                <h1>Project Modal</h1>
            </Drawer>
        </div>
    )
}