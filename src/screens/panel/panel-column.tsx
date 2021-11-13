import React from "react";
import { Panel } from "types/panel";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useTasksModal, useTasksSearchParams } from "./util";
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from "@emotion/styled";
import { Card } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";

const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) {
        return null;
    }
    return <img src={name === 'task' ? taskIcon : bugIcon} alt={name} />
}

const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTasksModal()
    const { name: keyword } = useTasksSearchParams()
    return (
        <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: '0.5rem' }}
            key={task.id}>
            <div><Mark keyword={keyword} name={task.name} /></div>
            <TaskTypeIcon id={task.typeId} />
        </Card>
    )
}


export const PanelColumn = ({ panel }: { panel: Panel }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.panelId === panel.id)
    return (
        <Container>
            <h3>{panel.name}</h3>
            <TasksContainer>
                {tasks?.map((task, index) => {
                    return (
                        <TaskCard task={task} key={index} />
                    )
                })}
                <CreateTask panelId={panel.id} />
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