import React from "react";
import { Pannel } from "types/pannel";
import { useTasks } from "utils/task";
import { useTasksSearchParams } from "./util";

export const PannelColumn = ({ pannel }: { pannel: Pannel }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.pannelId === pannel.id)
    return (<div>
        <h3>{pannel.name}</h3>
        {tasks?.map(task => {
            return (
                <div key={task.id}>
                    <div>
                        {task.name}
                    </div>
                </div>
            )
        })}
    </div>)
}
