import styled from "@emotion/styled"
import { Spin } from "antd"
import { ScreenContainer } from "components/lib"
import React from "react"
import { usePanel } from "utils/panel"
import { useTasks } from "utils/task"
import { CreatePanel } from "./create-panel"
import { PanelColumn } from "./panel-column"
import { SearchPanel } from "./search-panel"
import { TaskModal } from "./task-modal"
import { usePanelSearchParams, useProjectInUrl, useTasksSearchParams } from "./util"

export const PanelScreen = () => {
    const { data: currentProject } = useProjectInUrl()
    const { data: panels, isLoading: panelIsLoading } = usePanel(usePanelSearchParams())
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading || panelIsLoading
    return (
        <ScreenContainer>
            {currentProject ? <h1>{`${currentProject?.name} Panel`}</h1> : <h1>{`Panel`}</h1>}
            <SearchPanel />
            {isLoading ? <Spin size={"large"} /> : <ColumnContainer>
                {
                    panels?.map(panel => <PanelColumn panel={panel} />)
                }
                <CreatePanel />
            </ColumnContainer>}
            <TaskModal/>
        </ScreenContainer>
    )
}


export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  flex:1;
`