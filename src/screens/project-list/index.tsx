import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils/use-debounce";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useDirectors } from "utils/director";
import { useProjectSearchParams } from "./util";


export const ProjectListScreen = () => {
    // const [params, setParams] = useState(
    //     {
    //         name: '',
    //         personId: 0,
    //     })
    const [params, setParams] = useProjectSearchParams()
    const debouncedParams = useDebounce(params, 200)
    const { data: list, isLoading: isListLoading } = useProjects(debouncedParams)
    const { data: directors, isLoading: isDirectorLoading } = useDirectors()

    return (
        <div>
            <Container>
                <h3>Project List</h3>
                <SearchPanel params={params} setParams={setParams} directors={directors || []} />
                <List isLoading={isListLoading || isDirectorLoading} list={list || []} directors={directors || []} />
            </Container>
        </div>
    )
}

const Container = styled.div`
    padding: 3rem;
`;