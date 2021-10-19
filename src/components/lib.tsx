import styled from "@emotion/styled";
import { Alert, Button, Spin } from 'antd';
import React from "react";

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
    return (
        <FullPage>
            {/* read error's message properity */}
            <Alert message={`Error: ${error?.message}`} type="error"/>
        </FullPage>
    )
}
export const FullPageLoading = () => {
    return(
        <FullPage>
            <Spin size='large' />
        </FullPage>
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
export const ButtonWithNoPadding = styled(Button)`
    padding: 0;
`

