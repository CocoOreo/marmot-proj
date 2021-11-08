import styled from "@emotion/styled"
import React from "react"
import { usePanel } from "utils/panel"
import { PanelColumn } from "./panel-column"
import { SearchPanel } from "./search-panel"
import { usePanelSearchParams, useProjectInUrl } from "./util"

export const PanelScreen = () => {
    const { data: currentProject } = useProjectInUrl()
    const { data: panels } = usePanel(usePanelSearchParams())
    return (
        <div>
            {currentProject ? <h1>{`${currentProject?.name} Panel`}</h1> : <h1>{`Panel`}</h1>}
            <SearchPanel />
            <ColumnContainer>
                {
                    panels?.map(panel => <PanelColumn panel={panel} />)
                }
            </ColumnContainer>
        </div>
    )
}


const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`