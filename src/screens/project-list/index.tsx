import React, { useEffect, useState } from "react";
import { Director } from "types/director";
import { Project } from "types/project";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject } from "utils";
import { useMount } from "utils/use-mount";
import { useDebounce } from "utils/use-debounce";
import styled from "@emotion/styled";
import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";


export const ProjectListScreen = () => {
    const [params, setParams] = useState(
        {
            name: '',
            personId: 0,
        })
    const client = useHttp()
    const { run:getList, data: list, isLoading:isListLoading } = useAsync<Project[]>()
    const { run:getDirectors, data: directors, isLoading:isDirectorLoading } = useAsync<Director[]>()
    const debouncedParams = useDebounce(params)
    useEffect(() => {
        getList(client('projects', { data: cleanObject(debouncedParams) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParams])
    
    useMount(() => {
        getDirectors(client('users'))
    })
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