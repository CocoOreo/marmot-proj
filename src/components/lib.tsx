import styled from "@emotion/styled";
import { Alert } from 'antd';
import React from "react";

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
    return (
        <div>
            {/* read error's message properity */}
            <Alert message={`Error: ${error?.message}`} type="error" style={{
                margin: "10rem 2rem",
            }} />
        </div>
    )
}

export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
}>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.between ? "space-between" : undefined)};
    margin-bottom: ${(props) => props.marginBottom ? props.marginBottom + "rem" : 0};
    > * {
        /* To avoid the margin top of items affect the align-items;center */
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
    }
`

