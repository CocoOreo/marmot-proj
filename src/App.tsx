import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app/unauthenticated-app';

function App() {
  // console.log("当前环境为：" + process.env.NODE_ENV)
  // console.log("连接的API为：" + process.env.REACT_APP_BASE_URL)
  const { user } = useAuth()
  return (
    <div className="App">
        {user? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
