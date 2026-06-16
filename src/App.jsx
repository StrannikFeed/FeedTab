import React, { useState } from 'react';
import TimeBlock from './components/TimeBlock';
import ImageBlock from './components/ImageBlock';
import './styles/App.css';

function App() {

  return (
    <div className='app'>
      <TimeBlock />
      <ImageBlock />
    </div>
  );
}

export default App
