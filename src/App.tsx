import { AuthenticatedApp } from 'authenticated-app';
import React from 'react';
import { LoginScreen } from 'screens/login';

function App() {
  console.log("当前环境为：" + process.env.NODE_ENV)
  console.log("连接的API为：" + process.env.REACT_APP_BASE_URL)
  return (
    <div className="App">
        {/* <AuthenticatedApp></AuthenticatedApp> */}
        <LoginScreen></LoginScreen>
    </div>
  );
}

export default App;
