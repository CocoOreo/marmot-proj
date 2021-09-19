import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  console.log("当前环境为：" + process.env.NODE_ENV)
  console.log("连接的API为：" + process.env.REACT_APP_BASE_URL)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
