import React, { useEffect, useState } from "react";
import { Director } from "types/director";
import { Project } from "types/project";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject } from "utils";
import qs from 'qs';
import { useMount } from "utils/use-mount";
import { useDebounce } from "utils/use-debounce";

const baseUrl = process.env.REACT_APP_BASE_URL

export const ProjectListScreen = () => {
    const [params, setParams] = useState(
        {
            name: '',
            personId: undefined,
    })
    const debouncedParams = useDebounce(params)
    const [list, setList] = useState<Project[]>([])
    const [directors, setDiectors] = useState<Director[]>([])
    useEffect(() => {
        fetch(`${baseUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`).then(async (res) => {
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setList(data)
            }
        })
    }, [debouncedParams])
    useMount(() => {
        fetch(`${baseUrl}/users`).then(async (res) => {
            if (res.ok) {
                setDiectors(await res.json())
            }
        })
    })
    return (
        <div>
            <SearchPanel params={params} setParams={setParams} directors={directors} />
            <List list={list || []} directors={directors || []} />
        </div>
    )
}