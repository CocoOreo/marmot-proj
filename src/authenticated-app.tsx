import React from 'react';
import { ProjectListScreen } from 'screens/project-list';
import { ProjectScreen } from 'screens/project';
import { ReactComponent as SoftwareLogo } from 'assets/logo.svg';
import styled from '@emotion/styled'
import { Row } from 'components/lib';
import { Dropdown, Menu } from 'antd';
import { useAuth } from 'context/auth-context';
import { Routes, Navigate, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

export const AuthenticatedApp = () => {
    return (
        <div>
            <Container>
                <PageHeader />
                <Main>
                    <Router>
                        <Routes>
                            <Route path={'/projects'} element={<ProjectListScreen />}></Route>
                            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                            <Navigate to={"/projects"} />
                        </Routes>
                    </Router>
                </Main>
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
`;
const HeaderLeft = styled(Row)`
`;

const HeaderRight = styled.div`
    
`
const PageHeader = () => {
    const { user, logout } = useAuth()
    return (
        <Header between={true}>
            <HeaderLeft gap={true} between={true}>
                <SoftwareLogo width={'3rem'}></SoftwareLogo>
                <h3>
                    Marmot Project
                </h3>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key={"logout"}>
                                <span onClick={logout}>Log out</span>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <span>Hi, {user?.username}</span>
                </Dropdown>
            </HeaderRight>
        </Header>
    )
}

const Main = styled.main`
    height: calc(100vh - 6rem);
`;