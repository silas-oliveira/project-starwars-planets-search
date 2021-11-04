import React from 'react';
import './App.css';
import Table from './components/Table';
import STARSProvider from './context/STARSProvider';

function App() {
  return (
    <STARSProvider>
      <span>Hello, App!</span>
      <Table />
      {/* <Main /> */}
    </STARSProvider>
  );
}

export default App;
