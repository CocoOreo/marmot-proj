import React from 'react';
import { ProjectListScreen } from 'screens/project-list';
import { ProjectScreen } from 'screens/project';
import { ReactComponent as SoftwareLogo } from 'assets/logo.svg';
import styled from '@emotion/styled'
import { Row } from 'components/lib';
import { Button, Dropdown, Menu } from 'antd';
import { useAuth } from 'context/auth-context';
import { Routes, Navigate, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { resetRoute } from 'utils';
import { ProjectModal } from 'screens/project-list/project-modal';
import { ProjectPopover } from 'components/project-popover';

export const AuthenticatedApp = () => {
    return (
        <div>
            <Container>
                <Router>
                    {/* <Button onClick={()=> setProjectModalOpen(true)}>Open </Button> */}
                    <PageHeader />
                    <Main>
                        <Routes>
                            <Route path={'/projects'}
                                element={<ProjectListScreen />}>
                            </Route>
                            <Route path={'/projects/:projectId/*'}
                                element={<ProjectScreen />}>
                            </Route>
                            <Navigate to={"/projects"} />
                        </Routes>
                    </Main>
                    <ProjectModal></ProjectModal>
                </Router>
            </Container>
        </div>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
`;
const HeaderLeft = styled(Row)`

`;

const HeaderRight = styled.div`
    
`
const PageHeader = () => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true} between={true}>
                <Button type={'link'} onClick={resetRoute} style={{ width: '100%', display: 'flex', justifyContent: "between", alignItems: "center", padding: "0" }}>
                    <SoftwareLogo width={'4rem'} height={'100%'}></SoftwareLogo>
                    <h3 style={{ margin: '0 1rem' }} >
                        Marmot
                    </h3>
                </Button>
                <ProjectPopover />
                <span>User</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}

const User = () => {
    const { user, logout } = useAuth()
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key={"logout"}>
                        <span onClick={logout}>Log out</span>
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type={'link'} size={'large'}>Hi, {user?.username}</Button>
        </Dropdown>
    )
}

const Main = styled.main`
    display: flex;
    overflow: hidden;
    height: calc(100vh - 6rem);
`;