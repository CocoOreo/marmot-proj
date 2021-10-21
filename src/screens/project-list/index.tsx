import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils/use-debounce";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useDirectors } from "utils/director";
import { useProjectSearchParams } from "./util";
import { ButtonWithNoPadding, Row } from "components/lib";
import { useDispatch } from 'react-redux'
import { projectListActions } from "./project-list.slice";



export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
    const [params, setParams] = useProjectSearchParams()
    const debouncedParams = useDebounce(params, 200)
    const { data: list, isLoading: isListLoading, retry } = useProjects(debouncedParams)
    const { data: directors, isLoading: isDirectorLoading } = useDirectors()
    const dispatch = useDispatch()
    return (
        <div>
            <Container>
                <Row between={true} style={{ margin: '1rem 0' }}>
                    <h3>Project List</h3>
                    <ButtonWithNoPadding
                        onClick={() => {
                            return dispatch(projectListActions.openProjectModal())
                        }}>
                        Create Project
                    </ButtonWithNoPadding>
                </Row>
                <SearchPanel params={params} setParams={setParams} directors={directors || []} />
                <List refresh={retry}
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