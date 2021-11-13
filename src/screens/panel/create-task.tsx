import { Button, Card, Input } from "antd"
import React, { useEffect, useState } from "react"
import { useAddTask } from "utils/task"
import { useProjectIdInUrl, useTasksQueryKey } from "./util"

export const CreateTask = ({ panelId }: { panelId: number }) => {
    const [name, setName] = useState('')
    const { mutateAsync: createTask } = useAddTask(useTasksQueryKey())
    const projectId = useProjectIdInUrl()
    const [inputMode, setInputMode] = useState(false)
    const submit = async () => {
        await createTask({ projectId, name, panelId })
        setInputMode(false)
        setName('')
    }
    const toggle = () => setInputMode(mode => !mode)
    useEffect(() => {
        if (!inputMode) {
            setName('')
        }
    }, [inputMode])
    if (!inputMode) {
        return <Button type={'link'} onClick={toggle}>+ Create Task</Button>
    }
    return <Card>
        <Input onBlur={toggle}
            placeholder={'Do something?'}
            autoFocus={true}
            onPressEnter={submit}
            value={name}
            onChange={evt => setName(evt.target.value)}></Input>
    </Card>

}