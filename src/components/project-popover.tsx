import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjects } from "utils/project";

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
    const { data: projects } = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
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
            {props.projectButton}
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