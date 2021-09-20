import React from "react"
import { Director } from "types/director"
import { Project } from "types/project"

interface ListProps {
    list: Project[];
    directors: Director[];
}

export const List: React.FC<ListProps> = ({ list, directors }) => {
    console.log(directors, list)
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Director</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((project: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; personId: any }) => (
                            <tr>
                                <td>{project.name}</td>
                                <td>{directors.find((director) => {
                                    return director.id === project.personId
                                })?.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}