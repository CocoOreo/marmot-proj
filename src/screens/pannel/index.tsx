import styled from "@emotion/styled"
import React from "react"
import { usePannel } from "utils/pannel"
import { PannelColumn } from "./pannel-column"
import { usePannelSearchParams, useProjectInUrl } from "./util"

export const PannelScreen = () => {
    const { data: currentProject } = useProjectInUrl()
    const { data: pannels } = usePannel(usePannelSearchParams())
    return (
        <div>
            {currentProject ? <h1>{`${currentProject?.name} Pannel`}</h1> : <h1>{`Pannel`}</h1>}
            <ColumnContainer>
                {
                    pannels?.map(pannel => <PannelColumn pannel={pannel} />)
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