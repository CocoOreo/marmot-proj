import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils/use-debounce";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useDirectors } from "utils/director";
import { useProjectSearchParams } from "./util";
import { Button } from "antd";
import { Row } from "components/lib";


export const ProjectListScreen = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
    const [params, setParams] = useProjectSearchParams()
    const debouncedParams = useDebounce(params, 200)
    const { data: list, isLoading: isListLoading, retry } = useProjects(debouncedParams)
    const { data: directors, isLoading: isDirectorLoading } = useDirectors()

    return (
        <div>
            <Container>
                <Row between={true} style={{margin:'1rem 0'}}>
                    <h3>Project List</h3>
                    <Button onClick={() => props.setProjectModalOpen(true)}>Create Project</Button>
                </Row>
                <SearchPanel params={params} setParams={setParams} directors={directors || []} />
                <List refresh={retry} setProjectModalOpen={props.setProjectModalOpen} isLoading={isListLoading || isDirectorLoading} list={list || []} directors={directors || []} />
            </Container>
        </div>
    )
}

const Container = styled.div`
    padding: 3rem;
`;