import React from 'react';
import { ProjectListScreen } from './screens/project-list';

function App() {
  console.log("当前环境为：" + process.env.NODE_ENV)
  console.log("连接的API为：" + process.env.REACT_APP_BASE_URL)
  return (
    <div className="App">
      <header className="App-header">
        <ProjectListScreen></ProjectListScreen>
      </header>
    </div>
  );
}

export default App;
