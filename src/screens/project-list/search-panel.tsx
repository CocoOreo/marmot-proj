import { Form, Input } from "antd";
import { DirectorSelect } from "components/director-select";
import React from "react";
import { Director } from "types/director";
import { Project } from "types/project";
interface SearchPanelProps {
    directors: Director[];
    params: Partial<Pick<Project, "name" | "personId">>;
    setParams: (params: any) => void;
}
export const SearchPanel: React.FC<SearchPanelProps> = ({ params, setParams, directors }) => {
    // The first thing to create a react component
    // confirm what states we need
    return (<Form style={{ marginBottom: '2rem' }} layout={"inline"}>
        <Form.Item>
            <Input type="text"
                placeholder="Project Name"
                value={params.name}
                onChange={(ev) => {
                    setParams({
                        ...params,
                        name: ev.target.value
                    })
                }} />
        </Form.Item>
        <Form.Item>
            <DirectorSelect
                defaultOptionName={'Director'}
                value={params.personId}
                onChange={value => {
                    setParams({
                        ...params,
                        personId: value,
                    })
                }} />
        </Form.Item>
    </Form>
    )
}