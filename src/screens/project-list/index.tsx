import React, { useEffect, useState } from "react";
import { Director } from "types/director";
import { Project } from "types/project";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

export const ProjectListScreen = ()=>{
    const [params, setParams] = useState(
        {
            name: '',
            personId: 0,
    })
    const [list, setList] = useState<Project[]>([])
    const [directors, setDiectors] = useState<Director[]>([])
    useEffect(() => {
        fetch('http://localhost:8888/projects').then(async (res)=>{
            if(res.ok){
                const data = await res.json()
                console.log(data)
                setList(data)
            }
        })
    }, [params])
    useEffect(() => {
        fetch('http://localhost:8888/users').then(async (res)=>{
            if(res.ok){
                setDiectors(await res.json())
            }
        })
    }, [])
    return(
        <div>
            <SearchPanel params={params} setParams={setParams} directors={directors} />
            <List list={list || []} directors={directors || []}/>
        </div>
    )
}