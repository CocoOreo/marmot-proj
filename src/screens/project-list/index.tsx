import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils/use-debounce";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useDirectors } from "utils/director";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ErrorBox, Row } from "components/lib";
import { Button } from "antd";


export const ProjectListScreen = () => {
    const [params, setParams] = useProjectSearchParams()
    const { open } = useProjectModal()
    const debouncedParams = useDebounce(params, 200)
    const { data: list, isLoading: isListLoading, error } = useProjects(debouncedParams)
    const { data: directors, isLoading: isDirectorLoading } = useDirectors()
    return (
        <div>
            <Container>
                <Row between={true} style={{ margin: '1rem 0' }}>
                    <h3>Project List</h3>
                    <Button type={'link'} onClick={() => open()}>
                        Create Project
                    </Button>
                </Row>
                <SearchPanel params={params} setParams={setParams} directors={directors || []} />
                {
                    error ? (
                        <ErrorBox error={error} />
                    ) : null}
                <List
                    isLoading={isListLoading || isDirectorLoading}
                    list={list || []}
                    directors={directors || []}
                />
            </Container>
        </div>
    )
}

const Container = styled.div`
    padding: 3rem;
`;