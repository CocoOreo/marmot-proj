import React from "react";
import { Panel } from "types/panel";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useTasksSearchParams } from "./util";
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from "@emotion/styled";
import { Card } from "antd";

const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) {
        return null;
    }
    return <img src={name === 'task' ? taskIcon : bugIcon} alt={name} />
}

export const PanelColumn = ({ panel }: { panel: Panel }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.panelId === panel.id)
    return (
        <Container>
            <h3>{panel.name}</h3>
            <TasksContainer>
                {tasks?.map(task => {
                    return (
                        <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
                            <div>
                                {task.name}
                            </div>
                            <TaskTypeIcon id={task.typeId} />
                        </Card>
                    )
                })}
            </TasksContainer>
        </Container>)
}

export const Container = styled.div`
    min-width: 27rem;
    border-radius:  6px;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding: 0.8rem 0.8rem 1rem;
    margin-right: 1.5rem;
`

const TasksContainer = styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar{
        display: none;
    }
`