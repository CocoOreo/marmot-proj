import { Dropdown, Menu, Table } from "antd"
import { ButtonWithNoPadding } from "components/lib"
import { Pin } from "components/pin"
import dayjs from "dayjs"
import React from "react"
import { Link } from "react-router-dom"
import { Director } from "types/director"
import { Project } from "types/project"
import { useEditProject } from "utils/project"

interface ListProps {
    list: Project[];
    directors: Director[];
    isLoading: boolean;
    refresh?: () => void;
    projectButton:JSX.Element;
}

export const List: React.FC<ListProps> = ({ list, directors, isLoading, refresh, projectButton }) => {
    const { mutate } = useEditProject()
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(refresh)
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
                    render() {
                        return (
                            <Dropdown overlay={
                                <Menu>
                                    <Menu.Item>
                                        {projectButton}
                                    </Menu.Item>
                                </Menu>
                            }>
                                <ButtonWithNoPadding type={'link'}>...</ButtonWithNoPadding>
                            </Dropdown>
                        )
                    }
                }]} dataSource={list}>
        </Table>
    )
}