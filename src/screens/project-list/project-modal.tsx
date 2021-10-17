import { Drawer } from "antd"
import React from "react"

export const ProjectModal = (props: { projectModalOpen: boolean, onClose: () => void }) => {
    return (
        <div>
            <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={'100%'}>
                <h1>Project Modal</h1>
            </Drawer>
        </div>
    )
}