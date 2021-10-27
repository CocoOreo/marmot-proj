import { Drawer } from "antd"
import React from "react"
import { useProjectModal } from "./util"

export const ProjectModal = () => {
    const { projectModalOpen, close } = useProjectModal()
    return (
        <div>
            <Drawer
                onClose={() => close()}
                visible={projectModalOpen} width={'100%'}>
                <h1>Project Modal</h1>
            </Drawer>
        </div>
    )
}