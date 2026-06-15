import React, { useState } from 'react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Привет из React!</h1>
      <p>Счёт: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Нажми меня
      </button>
    </div>
  );
}

export default App
