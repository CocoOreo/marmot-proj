import { Form, Input, Select } from "antd";
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
    return (<Form style={{marginBottom:'2rem'}} layout={"inline"}>
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
            <Select value={params.personId} onChange={value => {
                setParams({
                    ...params,
                    personId: value,
                })
            }}>
                <Select.Option value={0}>Director</Select.Option>
                {directors?.map(director => <Select.Option key={director.id} value={director.id}>{director.name}</Select.Option>)}
            </Select>
        </Form.Item>
    </Form>
    )
}