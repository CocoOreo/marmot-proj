import styled from "@emotion/styled"
import { Button, Card } from "antd"
import React, { useState } from "react"
import { LoginScreen } from "screens/login"
import { RegisterScreen } from "screens/register"
import { ReactComponent as SoftwareLogo } from "assets/logo.svg"

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    return (
        <Container>
            <Header>
                <SoftwareLogo width="3rem" height="3rem"></SoftwareLogo>
                <span>Marmot</span>
            </Header>
            <ShadowCard>
                {isRegister ? <RegisterScreen /> : <LoginScreen />}
                <Button type="link" onClick={() => { setIsRegister(!isRegister) }}>
                    {isRegister ? 'Already have an accout?' : "Register Now"}
                </Button>
            </ShadowCard>
        </Container>
    )
}

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    > span {
        font-size: 1.6rem;
        font-weight: bold;
        padding: 1rem;
    }
`

const ShadowCard = styled(Card)`
  width: 38rem;
  min-height: 56rem;
  padding: 3rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;