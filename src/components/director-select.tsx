import React from "react";
import { useDirectors } from "utils/director";
import { IdSelect } from "./id-select";

export const DirectorSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const {data: directors }  = useDirectors()
    return ( 
        <IdSelect options={directors || []} {...props} />
    )
}