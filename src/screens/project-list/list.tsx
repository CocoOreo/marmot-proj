import { Dropdown, Menu, Modal, Table } from "antd"
import { ButtonWithNoPadding } from "components/lib"
import { Pin } from "components/pin"
import dayjs from "dayjs"
import React from "react"
import { Link } from "react-router-dom"
import { Director } from "types/director"
import { Project } from "types/project"
import { useDeleteProject, useEditProject } from "utils/project"
import { useProjectModal, useProjectsQueryKey } from "./util"

interface ListProps {
    list: Project[];
    directors: Director[];
    isLoading: boolean;
    refresh?: () => void;
}

export const List: React.FC<ListProps> = ({ list, directors, isLoading}) => {
    const { mutate } = useEditProject(useProjectsQueryKey())
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
    return (
        <Table loading={isLoading}
            pagination={false}
            rowKey={(record => record.id)}
            columns={[
                {
                    title: <Pin checked={true} disabled={true} />,
                    key: 'id',
                    render(value, project) {
                        return (
                            <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
                        )
                    }
                },
                {
                    title: 'Name',
                    key: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render(value, project) {
                        return (
                            <Link to={`${project.id}`}>{project.name}</Link>
                        )
                    }
                },
                {
                    title: 'Organization',
                    dataIndex: 'organization',
                    key: 'organization',
                },
                {
                    title: 'Director',
                    key: 'personId',
                    render(value, project) {
                        // The param in render:
                        // current value in this row, current data in this row, current index
                        return (
                            <span>
                                {directors.find((director) => {
                                    return director.id === project.personId
                                })?.name}
                            </span>
                        )
                    }
                },
                {
                    title: 'Created Time',
                    key: 'created',
                    render(value, project) {
                        return (
                            <span>
                                {project.created ? dayjs(project.created).format('YYYY-MM-DD') : undefined}
                            </span>
                        )
                    }
                },
                {
                    render(value, project) {
                        return (
                            <More project={project} />
                        )
                    }
                }]} dataSource={list}>
        </Table>
    )
}

const More = ({project} : {project:Project}) => {
    const { startEdit } = useProjectModal()
    const editProject = (id: number) => startEdit(id)
    const {mutate:deleteProject} = useDeleteProject(useProjectsQueryKey())
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title:"Are you sure you want to DELETE this project?",
            content:"Click YES to delete",
            okText:"YES",
            onOk(){
                deleteProject({id})
            }
        })
    }
    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item key={'edit'}>
                    <ButtonWithNoPadding onClick={()=> editProject(project.id)} type={'link'}>Edit</ButtonWithNoPadding>
                </Menu.Item>
                <Menu.Item key={'delete'}>
                    <ButtonWithNoPadding onClick={()=> confirmDeleteProject(project.id)} type={'link'}>Delete</ButtonWithNoPadding>
                </Menu.Item>
            </Menu>
        }>
            <ButtonWithNoPadding type={'link'}>...</ButtonWithNoPadding>
        </Dropdown>
    )
}