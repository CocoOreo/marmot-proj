import { Table } from "antd"
import dayjs from "dayjs"
import React from "react"
import { Director } from "types/director"
import { Project } from "types/project"

interface ListProps {
    list: Project[];
    directors: Director[];
    isLoading:boolean;
}

export const List: React.FC<ListProps> = ({ list, directors, isLoading }) => {
    return (
        <Table loading={isLoading} pagination={false} rowKey={(record => record.id)} columns={[{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },{
            title: 'Organization',
            dataIndex: 'organization',
            key: 'organization',
        }, {
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
        },{
            title: 'Created Time',
            key: 'created',
            render(value,project){
                return(
                    <span>
                        {project.created? dayjs(project.created).format('YYYY-MM-DD') : undefined}
                    </span>
                )
            }
        }]} dataSource={list}>
        </Table>
    )
}