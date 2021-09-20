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
    return (<form>
        <div>
            <input type="text" value={params.name} onChange={(ev) => {
                setParams({
                    ...params,
                    name: ev.target.value
                })
            }} />
            <select value={params.personId} onChange={(ev) => {
                setParams({
                    ...params,
                    personId: parseInt(ev.target.value),
                })
            }}>
                <option value=''>Director</option>
                {directors?.map(director => <option value={director.id}>{director.name}</option>)}
            </select>
        </div>
    </form>
    )
}