import { Button, Input } from "antd";
import { DirectorSelect } from "components/director-select";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
    const searchParams = useTasksSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined,
        })
    }
    return <Row marginBottom={4} gap={true}>
        <Input style={{ width: '20rem' }}
            placeholder={'Task Name'}
            value={searchParams.name}
            onChange={evt => setSearchParams({ name: evt.target.value })}
        />
        <DirectorSelect
            defaultOptionName={'Director'}
            value={searchParams.processorId}
            onChange={value => setSearchParams({ processorId: value })}
        />
        <TaskTypeSelect defaultOptionName={'Type'}
            value={searchParams.typeId}
            onChange={value => setSearchParams({ typeId: value })}
        />
        <Button onClick={() => reset()}>
            Reset Filter
        </Button>
    </Row>
}