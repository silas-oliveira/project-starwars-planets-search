import React from 'react';
import './App.css';
import Table from './components/Table';
import Input from './components/Input';
import STARSProvider from './context/STARSProvider';

function App() {
  return (
    <STARSProvider>
      <span>Hello, App!</span>
      <Input />
      <Table />
    </STARSProvider>
  );
}

export default App;
