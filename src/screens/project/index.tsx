import styled from '@emotion/styled'
import { Menu } from 'antd'
import React from 'react'
import { useLocation } from 'react-router'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { EpicScreen } from 'screens/epic'
import { PanelScreen } from 'screens/panel'

const useRouteType = ()=>{
    const units = useLocation().pathname.split('/')
    return units[units.length - 1]
}

export const ProjectScreen = () => {
    const routeType = useRouteType()
    return (
        <Container>
            <Aside>
                <Menu mode={'inline'} selectedKeys={[routeType]}>
                    <Menu.Item key={'panel'}>
                        <Link to={`panel`}>Panel</Link>
                    </Menu.Item>
                    <Menu.Item key={'epic'}>
                        <Link to={`epic`}>Epic</Link>
                    </Menu.Item>
                </Menu>
            </Aside>
            <Main>
                <Routes>
                    <Route path={'panel'} element={<PanelScreen />} />
                    <Route path={'epic'} element={<EpicScreen />} />
                    <Navigate replace={true} to={`${window.location.pathname}/panel`} />
                </Routes>
            </Main>
        </Container>
    )
}

const Aside = styled.aside`
    background-color: rgb(244,245,247);
    display: flex;
`

const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgba(0,0,0,0.1);
    display: flex;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
`