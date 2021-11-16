import { Input } from "antd"
import React from "react"
import { useState } from "react"
import { useAddPanel } from "utils/panel"
import { Container } from "./panel-column"
import { usePanelQueryKey, useProjectIdInUrl } from "./util"

export const CreatePanel = () => {
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl()
    const { mutateAsync: addPanel } = useAddPanel(usePanelQueryKey())
    const submit = async () => {
        await addPanel({ name, projectId })
        setName('')
    }

    return (
        <Container>
            <Input size={'large'}
                placeholder={'New Panel Name'}
                onPressEnter={submit}
                value={name}
                onChange={evt => setName(evt.target.value)}
            ></Input>
        </Container>
    )
}