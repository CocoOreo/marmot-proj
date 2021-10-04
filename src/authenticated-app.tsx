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
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
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
                <Button type={'link'} onClick={resetRoute} style={{ width:'100%', display: 'flex', justifyContent: "between", padding:"0" }}>
                    <SoftwareLogo width={'4rem'} height={'4rem'}></SoftwareLogo>
                    <h2 style={{margin:'0 1rem'}} >
                        Marmot Project
                    </h2>
                </Button>
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
                    <Button type={'link'} size={'large'}>Hi, {user?.username}</Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    )
}

const Main = styled.main`
    height: calc(100vh - 6rem);
`;