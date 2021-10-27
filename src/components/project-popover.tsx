import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from "utils/project";
import { ButtonWithNoPadding } from "./lib";

export const ProjectPopover = () => {
    const { data: projects } = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
    const { open } = useProjectModal()
    const content = (
        <ContentContainer>
            <Typography.Text type={'secondary'}>Favorites List</Typography.Text>
            <List>
                {
                    pinnedProjects?.map(project =>
                        <List.Item key={project.id}>
                            <List.Item.Meta title={project.name} />
                        </List.Item>)
                }
            </List>
            <Divider />
            <ButtonWithNoPadding type={'link'} onClick={() => open()}>
                Create Project
            </ButtonWithNoPadding>
        </ContentContainer>
    )
    return (
        <Popover placement={'bottom'} content={content}>
            Project
        </Popover>
    )
}

const ContentContainer = styled.div`
    min-width: 30rem;
`